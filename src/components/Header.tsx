import React from "react";
import { CiSearch } from "react-icons/ci";
import { IoMoonOutline } from "react-icons/io5";
import { LuSunDim } from "react-icons/lu";
import { GoBell } from "react-icons/go";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-white dark:bg-gray-800 px-10 py-5 shadow-sm">
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 rounded-xl dark:border-gray-700 bg-search dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button className="absolute right-0 top-0 mt-2 mr-3 text-gray dark:text-gray-500">
          <CiSearch size={26} />
        </button>
      </div>

      <div className="flex items-center gap-5">
        <button className="bg-search p-2 rounded-xl shadow-sm text-gray dark:text-gray-500">
          <IoMoonOutline size={26} />
        </button>
        <button className="bg-search p-2 rounded-xl shadow-sm text-gray dark:text-gray-500">
          <GoBell size={26} />
        </button>
      </div>
    </header>
  );
};

export default Header;
