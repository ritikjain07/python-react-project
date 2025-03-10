import React from "react";
import { FaTrash } from "react-icons/fa";
import EditModal from "./EditModal";
import { BASE_URL } from "../config";

const UserCard = ({ user, onDelete, setUsers }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* User image with gradient overlay */}
      <div className="relative h-40 bg-gradient-to-tr from-blue-500 to-purple-600">
        {user.img_url && (
          <img
            src={user.img_url}
            alt={user.name}
            className="absolute bottom-0 right-4 h-36 w-36 object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-lg transform translate-y-1/2"
          />
        )}
      </div>
      
      {/* User info */}
      <div className="pt-20 p-6">
        <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1">
          {user.name}
        </h3>
        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-3">
          {user.role}
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          {user.description}
        </p>
        
        {/* Actions */}
        <div className="flex justify-end space-x-2 pt-2 border-t dark:border-gray-700">
          <EditModal setUsers={setUsers} user={user} />
          <button
            onClick={() => onDelete(user.id)}
            className="p-2 text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-300"
            aria-label="Delete friend"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

const UserGrid = ({ users, setUsers, fetchUsers }) => {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this friend?")) {
      try {
        const res = await fetch(`${BASE_URL}/friends/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        if (res.ok) {
          setUsers(users.filter(user => user.id !== id));
        } else {
          throw new Error("Failed to delete friend");
        }
      } catch (error) {
        console.error("Error deleting friend:", error);
        alert("Failed to delete friend. Please try again.");
      }
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onDelete={handleDelete}
          setUsers={setUsers}
        />
      ))}
    </div>
  );
};

export default UserGrid;