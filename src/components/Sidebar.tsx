import React from "react";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";

const Sidebar = () => {
  return (
    <aside className="w-32 bg-white dark:bg-gray-800 shadow-md h-screen">
      <nav className="mt-8">
        <ul>
          <li>
            <Link
              to="/dashboard"
              className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
            >
              <span className="mr-3">🏠</span>
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/tasks"
              className="flex items-center px-4 py-2 mt-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
            >
              <span className="mr-3">📝</span>
              Tasks
            </Link>
          </li>
          <li>
            <Link
              to="/projects"
              className="flex items-center px-4 py-2 mt-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
            >
              <span className="mr-3">📁</span>
              Projects
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="flex items-center px-4 py-2 mt-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
            >
              <span className="mr-3">⚙️</span>
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
