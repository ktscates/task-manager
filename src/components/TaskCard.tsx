import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa6";
import logo from "../logo.svg";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

interface Task {
  id: string;
  title: string;
  description: string;
  image: string;
  members: string[];
  comments: { id: string; text: string; author: string }[];
  status: "todo" | "in-progress" | "completed";
}

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth(); // Access the user from AuthContext
  const { t } = useTranslation();

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="bg-white dark:bg-searchDark p-5 mt-5 w-80 rounded-2xl shadow-sm flex flex-col gap-5 relative z-10">
      <div className="bg-gray rounded-2xl">
        {task.image && (
          <img
            className="object-cover w-full h-40 rounded-2xl"
            src={task.image}
            alt={task.title}
          />
        )}
      </div>
      <div className="flex justify-between items-center">
        <h6
          className={`px-4 py-1.5 rounded-lg font-semibold text-base ${
            task.status === "todo"
              ? "bg-todo-bg text-todo-text dark:bg-todo-text dark:bg-opacity-30"
              : task.status === "in-progress"
              ? "bg-inProgress-bg text-inProgress-text dark:bg-inProgress-text dark:bg-opacity-30"
              : "bg-completed-bg text-completed-text dark:bg-completed-text dark:bg-opacity-30"
          }`}
        >
          {task.status === "todo"
            ? t("taskCard.status.todo")
            : task.status === "in-progress"
            ? t("taskCard.status.inProgress")
            : t("taskCard.status.completed")}
        </h6>
        <div className="relative">
          <button onClick={handleMenuToggle}>
            <BsThreeDotsVertical className="text-gray" size={24} />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-backgroundDark shadow-md rounded-md overflow-hidden z-10">
              <button
                onClick={() => onEdit(task)}
                className="block w-full text-left px-4 py-2 dark:text-white hover:bg-gray-200"
              >
                {t("taskCard.edit")}
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200"
              >
                {t("taskCard.delete")}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1 text-2xl font-extrabold text-black dark:text-white">
        {task.title}
        <span className="text-gray text-lg font-normal">
          {task.description}
        </span>
      </div>
      <div className="flex justify-between items-center border-t-2 border-backAuth dark:border-primary pt-4">
        <img
          className="rounded-full bg-gray w-8 h-8 object-cover"
          src={user?.photoURL || logo}
          alt="Member"
        />
        <span className="flex items-center gap-2 text-gray text-lg font-semibold">
          <FaRegCommentDots size={24} /> {task.comments.length}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
