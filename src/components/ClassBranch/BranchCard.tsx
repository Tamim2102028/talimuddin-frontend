import React from "react";
import { Link } from "react-router-dom";
import type { RoomListItem } from "../../types";

type Props = {
  Branch: RoomListItem;
};

const RoomCard: React.FC<Props> = ({ Branch }) => {
  return (
    <div className="overflow-hidden rounded-lg shadow-sm">
      <Link
        to={`/ClassBranch/branches/${Branch._id}`}
        className="relative block h-36 w-full bg-gray-100"
      >
        <img
          src={Branch.coverImage}
          alt={Branch.name}
          className="h-full w-full object-cover"
        />

        <div className="absolute top-0 left-0 w-full bg-black/85 p-2">
          <p className="truncate text-sm font-medium text-white">{Branch.name}</p>
          {Branch.creator && (
            <p className="mt-0.5 truncate text-xs text-gray-200">
              <Link
                onClick={(e) => e.stopPropagation()}
                to={`/profile/${Branch.creator.userName}`}
                className="font-medium text-blue-300 hover:underline"
              >
                {Branch.creator.fullName}
              </Link>
            </p>
          )}
          {Branch.isCR && (
            <div className="mt-1">
              <span className="inline-block rounded bg-green-500/80 px-2 py-0.5 text-xs text-white">
                CR
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default RoomCard;
