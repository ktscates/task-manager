import React, { useState, useEffect } from "react";
import { BsFilterLeft } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import TaskModal from "./TaskModal";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useTask } from "../context/TaskContext";
import { useTranslation } from "react-i18next";

const db = getFirestore();

interface Member {
  id: string;
  email: string;
  displayName: string;
}

interface TaskNavProps {
  onFilterChange: (filter: string) => void;
  onSortToggle: () => void;
  isAscending: boolean;
}

const TaskNav: React.FC<TaskNavProps> = ({
  onFilterChange,
  onSortToggle,
  isAscending,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableMembers, setAvailableMembers] = useState<Member[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const { tasks } = useTask();
  const { t } = useTranslation();

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

    fetchMembers();
  }, []);

  const todos = tasks.filter((task) => task.status === "todo");
  const progress = tasks.filter((task) => task.status === "in-progress");
  const completed = tasks.filter((task) => task.status === "completed");

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="w-full bg-white dark:bg-searchDark rounded-3xl shadow-sm lg:p-5 p-3 mt-5 flex lg:flex-row flex-col gap-2 justify-between lg:items-center">
      <div className="lg:flex lg:flex-row flex-col lg:items-center lg:justify-between lg:gap-4">
        <button
          onClick={() => handleFilterClick("all")}
          className={`px-4 py-2 rounded-lg font-semibold focus:outline-none ${
            selectedFilter === "all"
              ? "text-primary"
              : "text-gray dark:text-white dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          {t("taskNav.allTasks")}
          <span className="p-2 rounded-md bg-primary bg-opacity-10 ml-2">
            {tasks.length}
          </span>
        </button>
        <button
          onClick={() => handleFilterClick("todo")}
          className={`px-4 py-2 rounded-lg font-semibold focus:outline-none ${
            selectedFilter === "todo"
              ? "text-primary"
              : "text-gray dark:text-white dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          {t("taskNav.toDo")}
          <span className="p-2 rounded-md bg-gray bg-opacity-10 ml-2">
            {todos.length}
          </span>
        </button>
        <button
          onClick={() => handleFilterClick("in-progress")}
          className={`px-4 py-2 rounded-lg font-semibold focus:outline-none ${
            selectedFilter === "in-progress"
              ? "text-primary"
              : "text-gray dark:text-white dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          {t("taskNav.inProgress")}
          <span className="p-2 rounded-md bg-gray bg-opacity-10 ml-2">
            {progress.length}
          </span>
        </button>
        <button
          onClick={() => handleFilterClick("completed")}
          className={`px-4 py-2 rounded-lg font-semibold focus:outline-none ${
            selectedFilter === "completed"
              ? "text-primary"
              : "text-gray dark:text-white dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          {t("taskNav.completed")}
          <span className="p-2 rounded-md bg-gray bg-opacity-10 ml-2">
            {completed.length}
          </span>
        </button>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onSortToggle}
          className="px-4 py-2 border border-gray border-opacity-30 rounded-lg text-gray flex gap-3 items-center font-semibold focus:outline-none"
        >
          <BsFilterLeft size={24} />
          {t("taskNav.filterSort")}
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 border border-gray border-opacity-30 rounded-lg text-gray flex gap-3 items-center font-semibold focus:outline-none"
        >
          <IoMdAdd size={24} />
          {t("taskNav.newTask")}
        </button>
      </div>

      {isModalOpen && (
        <TaskModal
          onClose={() => setIsModalOpen(false)}
          availableMembers={availableMembers}
        />
      )}
    </div>
  );
};

export default TaskNav;
