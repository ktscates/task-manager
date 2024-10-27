import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMoonOutline } from "react-icons/io5";
import { LuSunDim } from "react-icons/lu";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

interface HeaderProps {
  onSearchChange: (searchTerm: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
  const { theme, toggleTheme } = useTheme();
  const [search, setSearch] = useState("");
  const { t, i18n } = useTranslation();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    onSearchChange(searchTerm);
  };

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <header className="flex lg:flex-row flex-col gap-2 lg:items-center justify-between bg-white dark:bg-backgroundDark px-10 py-5 shadow">
      <div className="relative">
        <input
          type="text"
          placeholder={t("header.search_placeholder")}
          value={search}
          onChange={handleSearchChange}
          className="px-4 py-2 w-full rounded-lg shadow-sm dark:border-gray-700 bg-search dark:bg-searchDark dark:text-white focus:outline-none"
        />
        <button className="absolute right-0 top-0 mt-2 mr-3 text-primary dark:text-gray-500">
          <CiSearch size={26} />
        </button>
      </div>

      <div className="flex items-center gap-5">
        <button
          onClick={toggleTheme}
          className="bg-search p-2 rounded-xl shadow-sm text-primary dark:text-white dark:bg-navy dark:hover:bg-primary  hover:bg-primary hover:text-white "
        >
          {theme === "dark" ? (
            <LuSunDim size={26} />
          ) : (
            <IoMoonOutline size={26} />
          )}
        </button>

        <button
          onClick={() => changeLanguage("en")}
          className={`p-2 rounded-md shadow-sm ${
            i18n.language === "en"
              ? "bg-primary text-white"
              : "bg-search text-primary dark:text-white dark:bg-navy dark:hover:bg-primary hover:text-white hover:bg-primary"
          }`}
        >
          {t("header.language_en")}
        </button>
        <button
          onClick={() => changeLanguage("fr")}
          className={`p-2 rounded-md shadow-sm ${
            i18n.language === "fr"
              ? "bg-primary text-white"
              : "bg-search text-primary dark:text-white dark:bg-navy dark:hover:bg-primary hover:text-white hover:bg-primary"
          }`}
        >
          {t("header.language_fr")}
        </button>
      </div>
    </header>
  );
};

export default Header;
