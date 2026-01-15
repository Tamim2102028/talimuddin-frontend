import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const ManagementHeader: React.FC = () => {
  const location = useLocation();

  // Only show Create Room button on main management page
  const showButton = location.pathname === "/management";

  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Room Management</h1>
        <p className="text-gray-600">Manage all rooms and classes.</p>
      </div>
      <div>
        {showButton && (
          <Link
            to="/classroom/createroom"
            className="flex items-center gap-2 rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition-colors hover:border-blue-400 hover:bg-blue-100"
          >
            <FaPlus className="h-4 w-4" />
            Create Room
          </Link>
        )}
      </div>
    </header>
  );
};

export default ManagementHeader;
