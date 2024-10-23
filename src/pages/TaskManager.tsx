// src/pages/TaskManager.tsx
import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const TaskManager = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-back dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md w-full">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              Welcome, {user?.email}!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              This is your task manager. Start adding your tasks!
            </p>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
