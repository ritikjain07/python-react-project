import React, { useState, useEffect } from "react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { FaUserFriends } from "react-icons/fa";
import CreateUserModal from "./CreateUserModal";

const Navbar = ({ setUsers }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and brand name */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
              <FaUserFriends className="text-white text-xl" />
            </div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              FriendTracker
            </span>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center text-sm text-gray-600 dark:text-gray-300">
              <span className="rounded-full bg-green-100 dark:bg-green-900 px-3 py-1 text-green-800 dark:text-green-200 font-medium">
                API Connected
              </span>
            </div>
            
            {/* <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? 
                <LuSun size={20} className="text-amber-500" /> : 
                <IoMoon className="text-indigo-700" />
              }
            </button> */}
            
            <CreateUserModal setUsers={setUsers} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;