import React, { useState, useEffect } from "react";
import { useTask } from "../context/TaskContext";
import { useToast } from "../context/ToastContext"; // Import the useToast hook

interface TaskModalProps {
  taskId?: string;
  onClose: () => void;
  availableMembers: { id: string; email: string; displayName: string }[];
}

const TaskModal: React.FC<TaskModalProps> = ({
  taskId,
  onClose,
  availableMembers,
}) => {
  const { addTask, updateTask, getTaskById } = useTask();
  const { showToast } = useToast(); // Use the useToast hook
  const task = taskId ? getTaskById(taskId) : null;

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [members, setMembers] = useState<string[]>(task?.members || []);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(task?.comments || []);
  const [status, setStatus] = useState<"todo" | "in-progress" | "completed">(
    task?.status || "todo"
  );

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setMembers(task.members);
      setComments(task.comments);
    }
  }, [task]);

  const handleSave = async () => {
    try {
      if (taskId) {
        await updateTask(
          taskId,
          { title, description, members, comments, status },
          imageFile || undefined
        );
        showToast("Task updated successfully!", "success"); // Success message for update
      } else {
        await addTask(
          { title, description, members, comments, status },
          imageFile || undefined
        );
        showToast("Task added successfully!", "success"); // Success message for add
      }
      onClose();
    } catch (error) {
      console.error("Error saving task:", error);
      showToast("Failed to save task. Please try again.", "error"); // Error message for failure
    }
  };

  const handleAddComment = () => {
    const newComment = {
      id: Date.now().toString(),
      text: comment,
      author: "User",
    };
    setComments([...comments, newComment]);
    setComment("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImageFile(files[0]);
    }
  };

  const handleMemberChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setMembers((prevMembers) => {
      // Add member if not already in the list
      if (!prevMembers.includes(selectedId)) {
        return [...prevMembers, selectedId];
      }
      return prevMembers;
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl mb-4">{taskId ? "Edit Task" : "New Task"}</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        ></textarea>
        {/* Image Upload */}
        <div className="mb-4">
          <label className="block mb-2">Image (Optional)</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        {/* Members Assignment Dropdown */}
        <div className="mb-4">
          <label className="block mb-2">Assign Members</label>
          <select
            onChange={handleMemberChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a member</option>
            {availableMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.displayName}
              </option>
            ))}
          </select>
          {/* Display selected members */}
          <div className="mt-2">
            <strong>Assigned Members:</strong> {members.join(", ")}
          </div>
        </div>
        <div>
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "todo" | "in-progress" | "completed")
            }
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        {/* Comments Section */}
        <div className="mb-4">
          <label className="block mb-2">Comments</label>
          <ul className="mb-2">
            {comments.map((c) => (
              <li key={c.id} className="border-b p-1">
                {c.author}: {c.text}
              </li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add Comment
          </button>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-black p-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-green-500 text-white p-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
