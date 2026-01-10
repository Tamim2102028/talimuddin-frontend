import React from "react";
import { FaCrown, FaUserShield, FaUserEdit } from "react-icons/fa";
import { GROUP_ROLES } from "../../../constants";

interface RoleBadgeProps {
  role: (typeof GROUP_ROLES)[keyof typeof GROUP_ROLES];
  className?: string;
}

const RoleBadge: React.FC<RoleBadgeProps> = ({ role, className = "" }) => {
  if (role === GROUP_ROLES.OWNER) {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded border border-yellow-200 bg-yellow-100 px-2 py-0.5 text-xs font-bold text-yellow-700 shadow-sm ${className}`}
      >
        <FaCrown className="text-yellow-600" size={10} />
        Owner
      </span>
    );
  }

  if (role === GROUP_ROLES.ADMIN) {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded border border-blue-200 bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700 shadow-sm ${className}`}
      >
        <FaUserShield className="text-blue-600" size={10} />
        Admin
      </span>
    );
  }

  if (role === GROUP_ROLES.MODERATOR) {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded border border-green-200 bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700 shadow-sm ${className}`}
      >
        <FaUserEdit className="text-green-600" size={10} />
        Moderator
      </span>
    );
  }

  return null;
};

export default RoleBadge;
