import React, { useState, useEffect } from "react";
import { BsFilterLeft } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import TaskModal from "./TaskModal"; // Import the TaskModal component
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Firestore initialization
const db = getFirestore();

// Define a type for the members
interface Member {
  id: string;
  email: string;
  displayName: string;
}

const TaskNav = () => {
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableMembers, setAvailableMembers] = useState<Member[]>([]);

  // Function to fetch users from Firestore
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersList: Member[] = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          email: doc.data().email,
          displayName: doc.data().displayName,
        }));
        setAvailableMembers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchMembers(); // Call function to fetch users
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-5 mt-5 flex justify-between items-center">
      {/* Tabs */}
      <div className="flex gap-4">
        <button className="px-4 py-2 rounded-lg text-primary font-semibold hover:bg-primary focus:outline-none">
          All Tasks
          <span className="p-2 rounded-md bg-primary bg-opacity-10 ml-2">
            23
          </span>
        </button>
        <button className="px-4 py-2 rounded-lg text-gray font-semibold dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none">
          To do{" "}
          <span className="p-2 rounded-md bg-gray bg-opacity-10 ml-2">3</span>
        </button>
        <button className="px-4 py-2 rounded-lg text-gray font-semibold dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none">
          In Progress
          <span className="p-2 rounded-md bg-gray bg-opacity-10 ml-2">6</span>
        </button>
        <button className="px-4 py-2 rounded-lg text-gray font-semibold dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none">
          Completed
          <span className="p-2 rounded-md bg-gray bg-opacity-10 ml-2">14</span>
        </button>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button className="px-4 py-2 border border-gray border-opacity-30 rounded-lg text-gray flex gap-3 items-center font-semibold focus:outline-none">
          <BsFilterLeft size={24} />
          Filter & Sort
        </button>
        <button
          onClick={() => setIsModalOpen(true)} // Open modal on click
          className="px-4 py-2 border border-gray border-opacity-30 rounded-lg text-gray flex gap-3 items-center font-semibold focus:outline-none"
        >
          <IoMdAdd size={24} />
          New Task
        </button>
      </div>

      {/* Render the TaskModal when isModalOpen is true */}
      {isModalOpen && (
        <TaskModal
          onClose={() => setIsModalOpen(false)} // Close modal handler
          availableMembers={availableMembers} // Pass available members to modal
        />
      )}
    </div>
  );
};

export default TaskNav;
