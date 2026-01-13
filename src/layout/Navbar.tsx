import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaTint } from "react-icons/fa";
import { authHooks } from "../hooks/useAuth";

const Navbar: React.FC = () => {
  const { isAuthenticated } = authHooks.useUser();

  if (!isAuthenticated) {
    return null; // Don't show navbar if not authenticated
  }

  const navItems = [
    { to: "/", icon: FaHome, label: "Home" },
    { to: "/blood-donation", icon: FaTint, label: "Blood Donation" },
  ];

  return (
    <nav className="sticky top-0 z-50 flex h-12 w-full items-center justify-evenly border-b border-gray-200 bg-white shadow-sm">
      {/* Navigation items */}
      {navItems.map(({ to, icon: Icon, label, badge }) => (
        <div key={to} className="group relative">
          <NavLink
            to={to}
            className={({ isActive }) =>
              `flex items-center space-x-2 rounded-lg p-2 transition-colors ${isActive ? "text-green-600" : "text-gray-600 hover:bg-gray-100 hover:text-green-600"}`
            }
          >
            <Icon className="h-5 w-5" />
            <span className="hidden text-sm font-medium md:block">{label}</span>
            {badge && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {badge}
              </span>
            )}
          </NavLink>
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
