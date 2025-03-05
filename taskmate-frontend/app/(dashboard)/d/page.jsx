"use client";

export default function Dashboard() {
  return (
    <>
      <main className="min-h-screen p-6 bg-white dark:bg-[#121212] text-gray-900 dark:text-white">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Task Manager</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Add Task</button>
        </div>

        {/* Task Progress Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Task Progress</h2>
          <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg shadow-lg mt-4">
            <div className="flex justify-between items-center">
              <p className="text-lg">Design new landing page</p>
              <p className="text-sm text-gray-500">In Progress</p>
            </div>
            <div className="w-full bg-gray-300 rounded-full mt-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: "60%" }}></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">60% Completed</p>
          </div>
        </div>

        {/* Task List Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Your Tasks</h2>
          <ul className="mt-4 space-y-4">
            <li className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                <p className="text-lg">Fix Bug in Dashboard</p>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm">Mark as Done</button>
              </div>
              <p className="text-sm text-gray-500">Due: 5th March</p>
            </li>
            <li className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                <p className="text-lg">Prepare Presentation</p>
                <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm">In Progress</button>
              </div>
              <p className="text-sm text-gray-500">Due: 7th March</p>
            </li>
            <li className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                <p className="text-lg">Write Blog Post</p>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm">Mark as Done</button>
              </div>
              <p className="text-sm text-gray-500">Due: 9th March</p>
            </li>
          </ul>
        </div>

        {/* User Profile Section */}
        <div className="mt-10 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold">Your Profile</h2>
          <div className="mt-4">
            <p className="text-lg">Name: John Doe</p>
            <p className="text-lg">Role: Developer</p>
            <p className="text-lg">Email: johndoe@example.com</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">Edit Profile</button>
          </div>
        </div>
      </main>
    </>
  );
}
