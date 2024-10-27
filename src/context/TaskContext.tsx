import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { db, storage } from "../firebase"; // Import Firestore and Storage
import {
  collection,
  doc,
  getDocs,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface Task {
  id: string;
  title: string;
  description: string;
  image: string;
  members: string[]; // List of assigned member IDs
  comments: { id: string; text: string; author: string }[];
  status: "todo" | "in-progress" | "completed"; // New status field
}

interface TaskContextType {
  tasks: Task[];
  addTask: (
    task: Omit<Task, "id" | "image">,
    imageFile?: File
  ) => Promise<void>;
  updateTask: (
    id: string,
    updatedTask: Partial<Omit<Task, "id">>,
    imageFile?: File
  ) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  getTaskById: (id: string) => Task | undefined;
  getTasks: () => Promise<Task[]>; // New function to get all tasks
  addComment: (
    taskId: string,
    comment: { id: string; text: string; author: string }
  ) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Fetch tasks from Firestore on component mount
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, []);

  // Add a new task to Firestore
  const addTask = async (
    task: Omit<Task, "id" | "image">,
    imageFile?: File
  ) => {
    let imageUrl = "";

    // If an image is provided, upload it to Firebase Storage
    if (imageFile) {
      const imageRef = ref(storage, `tasks/${Date.now()}-${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    const newTask = {
      ...task,
      image: imageUrl,
      status: "todo", // Set default status to "todo"
      comments: [],
    };

    await addDoc(collection(db, "tasks"), newTask);
  };

  // Update a task in Firestore
  const updateTask = async (
    id: string,
    updatedTask: Partial<Omit<Task, "id">>,
    imageFile?: File
  ) => {
    let imageUrl = updatedTask.image || "";

    // If a new image is provided, upload it to Firebase Storage
    if (imageFile) {
      const imageRef = ref(storage, `tasks/${Date.now()}-${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    await updateDoc(doc(db, "tasks", id), {
      ...updatedTask,
      image: imageUrl,
    });
  };

  // Delete a task from Firestore
  const deleteTask = async (id: string) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  // Get task by ID
  const getTaskById = (id: string) => tasks.find((task) => task.id === id);

  const getTasks = async (): Promise<Task[]> => {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Task[];
  };

  const addComment = async (
    taskId: string,
    comment: { id: string; text: string; author: string }
  ) => {
    const taskDocRef = doc(db, "tasks", taskId); // Get a reference to the task document

    // Fetch the current task to get its comments
    const taskSnapshot = await getDoc(taskDocRef); // Use getDoc for a single document
    const currentTask = taskSnapshot.data() as Task; // Access the document's data

    // Add the new comment to the existing comments
    const updatedComments = [...(currentTask?.comments || []), comment];

    // Update the task with the new comments array
    await updateDoc(taskDocRef, {
      comments: updatedComments,
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        getTaskById,
        getTasks,
        addComment, // Expose addComment function
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};
