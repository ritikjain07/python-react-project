import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import UserGrid from "./components/UserGrid";
import { FaUserFriends } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import { BASE_URL } from "./config";

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch users function that can be passed to other components
  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/friends`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load friends. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar setUsers={setUsers} />
      
      <div className="container mx-auto p-4">
        <div className="text-center my-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full shadow-lg">
              <FaUserFriends className="text-white text-4xl" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              My Besties
            </span>
            <span className="ml-2">🚀</span>
          </h1>
          
          <div className="mt-4 flex items-center justify-center">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {users.length > 0 
                ? `You have ${users.length} amazing friend${users.length === 1 ? '' : 's'}`
                : "Your friends will appear here"}
            </p>
            <button 
              onClick={fetchUsers}
              disabled={isLoading}
              className="ml-3 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title="Refresh friends list"
            >
              <FiRefreshCw className={`text-gray-600 dark:text-gray-300 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
          
          {error && (
            <div className="mt-2 text-red-500 dark:text-red-400">
              {error}
            </div>
          )}
        </div>
        
        {isLoading && users.length === 0 ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 rounded-full border-4 border-t-blue-500 border-blue-200 animate-spin"></div>
          </div>
        ) : users.length > 0 ? (
          <UserGrid users={users} setUsers={setUsers} fetchUsers={fetchUsers} />
        ) : (
          <div className="text-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">
              No friends yet. Click the + button in the navbar to add your first friend!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;