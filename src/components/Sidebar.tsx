import React from "react";
import { Link } from "react-router-dom";
import { FaRegUser, FaRegFileLines } from "react-icons/fa6";
import { GrHomeRounded } from "react-icons/gr";
import { HiOutlineEnvelope, HiOutlineFolderMinus } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import logo from "../logo.svg";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { users } = useAuth();

  return (
    <aside className="w-20 bg-white dark:bg-gray-800 shadow h-screen relative">
      <nav className="mt-24 flex flex-col justify-between items-end">
        <ul className="flex flex-col gap-4 items-center pb-8 border-b border-backAuth">
          <li>
            <Link
              to=""
              className="flex items-center px-4 py-2 text-gray dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
            >
              <GrHomeRounded size={22} />
            </Link>
          </li>
          <li>
            <Link
              to=""
              className="flex items-center px-4 py-2 mt-2 text-gray dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
            >
              <HiOutlineEnvelope size={24} />
            </Link>
          </li>
          <li>
            <Link
              to=""
              className="flex items-center px-4 py-2 mt-2 text-gray dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
            >
              <FaRegFileLines size={24} />
            </Link>
          </li>
          <li>
            <Link
              to=""
              className="flex items-center px-4 py-2 mt-2 text-gray dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
            >
              <HiOutlineFolderMinus size={24} />
            </Link>
          </li>
        </ul>

        <ul className="flex flex-col gap-2 items-center py-8 border-b border-backAuth">
          {users?.map((user) => (
            <li key={user.uid}>
              <Link
                to="/tasks"
                className="flex items-center px-4 py-2 mt-2 text-gray dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
              >
                <img
                  className="rounded-full border border-gray w-8 h-8 object-cover"
                  src={user.photoURL! || logo}
                  alt={user.displayName!}
                />
              </Link>
            </li>
          ))}
          {/* <li>
            <Link
              to=""
              className=
            >
              <img
                className="rounded-full w-10 h-10 object-cover"
                src={user?.photoURL || logo}
                alt="logo"
              />
            </Link>
          </li> */}
        </ul>

        <ul className="flex flex-col gap-4 items-center absolute bottom-0 pb-8">
          <li>
            <Link
              to=""
              className="flex items-center px-4 py-2 mt-2 text-gray dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
            >
              <IoSettingsOutline size={24} />
            </Link>
          </li>
          <li>
            <Link
              to=""
              className="flex items-center px-4 py-2 mt-2 text-gray dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
            >
              <FaRegUser size={26} />
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
