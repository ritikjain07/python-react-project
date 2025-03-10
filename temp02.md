import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BiEditAlt } from "react-icons/bi";
import { BASE_URL } from "../config"; 

function EditModal({ setUsers, user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: user.name,
    role: user.role,
    description: user.description,
  });
  const [toastMessage, setToastMessage] = useState(null);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const showToast = (type, title, message) => {
    setToastMessage({ type, title, message });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/friends/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setUsers((prevUsers) => prevUsers.map((u) => (u.id === user.id ? data : u)));
      showToast("success", "Yayy! 🎉", "Friend updated successfully.");
      closeModal();
    } catch (error) {
      showToast("error", "An error occurred.", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {toastMessage && (
        <div 
          className={`fixed top-4 right-4 p-4 rounded-md shadow-lg ${
            toastMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white z-50`}
        >
          <h3 className="font-bold">{toastMessage.title}</h3>
          <p>{toastMessage.message}</p>
        </div>
      )}

      <button
        onClick={openModal}
        className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none"
        aria-label="Edit friend"
      >
        <BiEditAlt size={20} />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                  <form onSubmit={handleEditUser}>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                    >
                      Update Friend
                    </Dialog.Title>
                    <button
                      type="button"
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                      onClick={closeModal}
                    >
                      <span className="sr-only">Close</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    <div className="mt-4">
                      <div className="flex space-x-4">
                        <div className="w-1/2">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Full Name
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="John Doe"
                            value={inputs.name}
                            onChange={(e) => setInputs((prev) => ({ ...prev, name: e.target.value }))}
                          />
                        </div>

                        <div className="w-1/2">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Role
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Software Engineer"
                            value={inputs.role}
                            onChange={(e) => setInputs((prev) => ({ ...prev, role: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Description
                        </label>
                        <textarea
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          rows="3"
                          placeholder="He's a software engineer who loves to code and build things."
                          value={inputs.description}
                          onChange={(e) => setInputs((prev) => ({ ...prev, description: e.target.value }))}
                        ></textarea>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className={`inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none ${
                          isLoading ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                        disabled={isLoading}
                      >
                        {isLoading ? "Updating..." : "Update"}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default EditModal;

// In your UserGrid.jsx
const handleEdit = (user) => {
  setEditingUser(user);
  // Make sure this function is actually using the EditModal component
};

return (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {users.map((user) => (
      <UserCard
        key={user.id}
        user={user}
        onDelete={handleDelete}
        onEdit={handleEdit}  // Make sure this prop is passed
      />
    ))}
  </div>
);