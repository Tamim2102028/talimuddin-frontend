import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaPlus, FaSignInAlt } from "react-icons/fa";
import { authHooks } from "../../hooks/useAuth";

const Header: React.FC = () => {
  const { user } = authHooks.useUser();
  const location = useLocation();
  const isTeacher = user?.userType === "TEACHER";

  // Only show buttons on main classroom page
  const showButtons = location.pathname === "/classroom";

  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ClassRoom</h1>
        <p className="text-gray-600">Join and manage your classes.</p>
      </div>
      <div>
        {showButtons && isTeacher && (
          <Link
            to="/classroom/createroom"
            className="flex items-center gap-2 rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition-colors hover:border-blue-400 hover:bg-blue-100"
          >
            <FaPlus className="h-4 w-4" />
            Create Room
          </Link>
        )}
        {showButtons && !isTeacher && (
          <Link
            to="/classroom/joinroom"
            className="flex items-center gap-2 rounded-lg border-2 border-dashed border-green-300 bg-green-50 px-4 py-2 text-sm font-semibold text-green-600 transition-colors hover:border-green-400 hover:bg-green-100"
          >
            <FaSignInAlt className="h-4 w-4" />
            Join Room
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
