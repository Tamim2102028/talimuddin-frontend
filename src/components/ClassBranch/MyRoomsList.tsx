import React from "react";
<<<<<<<< HEAD:src/components/ClassBranch/MyRoomsList.tsx
import RoomCard from "./RoomCard";
import { roomHooks } from "../../hooks/useRoom";
import { authHooks } from "../../hooks/useAuth";
import { USER_TYPES } from "../../constants/user";
import type { RoomListItem } from "../../types";

const MyRoomsList: React.FC = () => {
========
import { authHooks } from "../../../hooks/useAuth";
import { USER_TYPES } from "../../../constants/user";
import type { BranchListItem } from "../../../types";
import BranchCard from "../BranchCard";
import { branchHooks } from "../../../hooks/useBranch";

interface BranchesProps {
  type: "all" | "my";
}

const Branches: React.FC<BranchesProps> = ({ type }) => {
>>>>>>>> 0e43037dcfc5aa28b932fc17c03162fef517909f:src/components/ClassBranch/Tabs/Branchs.tsx
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
<<<<<<<< HEAD:src/components/ClassBranch/MyRoomsList.tsx
  } = roomHooks.useMyRoom();
========
  } =
    type === "all" ? branchHooks.useallBranches() : branchHooks.usemyBranches();
>>>>>>>> 0e43037dcfc5aa28b932fc17c03162fef517909f:src/components/ClassBranch/Tabs/Branchs.tsx

  const { user } = authHooks.useUser();

  const branches: BranchListItem[] =
    data?.pages.flatMap((page) => page.data.branches) || [];
  const totalDocs = data?.pages[0]?.data.pagination.totalDocs || 0;

  if (isLoading) {
    return (
      <div className="rounded-xl border border-gray-300 bg-white p-6 shadow">
        <p className="text-sm text-gray-600">Loading branches...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-300 bg-red-50 p-6 shadow">
        <p className="text-sm text-red-600">Failed to load branches</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
<<<<<<<< HEAD:src/components/ClassBranch/MyRoomsList.tsx
          My Rooms {totalDocs ? `(${totalDocs})` : ""}
========
          {type === "all" ? "All Branches" : "My Branches"}{" "}
          {totalDocs ? `(${totalDocs})` : ""}
>>>>>>>> 0e43037dcfc5aa28b932fc17c03162fef517909f:src/components/ClassBranch/Tabs/Branchs.tsx
        </h2>
      </div>

      {/* no branches message */}
      {branches.length === 0 ? (
        <div className="rounded-xl border border-gray-300 bg-white p-6 shadow">
          <p className="text-center text-sm font-medium text-gray-600">
<<<<<<<< HEAD:src/components/ClassBranch/MyRoomsList.tsx
            {user?.userType === USER_TYPES.TEACHER
              ? "Create or join a room to get started."
              : "Join a room to get started."}
========
            {type === "all"
              ? "No branches available yet."
              : user?.userType === USER_TYPES.TEACHER
                ? "Create or join a Branch to get started."
                : "Join a Branch to get started."}
>>>>>>>> 0e43037dcfc5aa28b932fc17c03162fef517909f:src/components/ClassBranch/Tabs/Branchs.tsx
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {branches.map((r) => (
              <BranchCard key={r._id} Branch={r} />
            ))}
          </div>

          {/* Load More Button */}
          {hasNextPage && (
            <div className="flex justify-center pt-4">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:outline-none disabled:opacity-50"
              >
                {isFetchingNextPage ? "Loading..." : "Load More"}
              </button>
            </div>
          )}

          {/* Loading Skeleton for Next Page */}
          {isFetchingNextPage && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="h-64 animate-pulse rounded-xl bg-gray-100"
                ></div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

<<<<<<<< HEAD:src/components/ClassBranch/MyRoomsList.tsx
export default MyRoomsList;
========
export default Branches;
>>>>>>>> 0e43037dcfc5aa28b932fc17c03162fef517909f:src/components/ClassBranch/Tabs/Branchs.tsx
