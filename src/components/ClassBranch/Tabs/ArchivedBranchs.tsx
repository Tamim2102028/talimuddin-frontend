import React from "react";
<<<<<<<< HEAD:src/components/Management/ManagementRoomsList.tsx
import RoomCard from "../ClassRoom/RoomCard";
import { roomHooks } from "../../hooks/useRoom";
import type { RoomListItem } from "../../types";

const ManagementRoomsList: React.FC = () => {
========
import BranchCard from "../BranchCard";
import { branchHooks } from "../../../hooks/useBranch";
import type { BranchListItem } from "../../../types";

const ArchivedBranches: React.FC = () => {
>>>>>>>> 0e43037dcfc5aa28b932fc17c03162fef517909f:src/components/ClassBranch/Tabs/ArchivedBranchs.tsx
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
<<<<<<<< HEAD:src/components/Management/ManagementRoomsList.tsx
  } = roomHooks.useAllRooms();
========
  } = branchHooks.useArchivedBranches();
>>>>>>>> 0e43037dcfc5aa28b932fc17c03162fef517909f:src/components/ClassBranch/Tabs/ArchivedBranchs.tsx

  const branches: BranchListItem[] =
    data?.pages.flatMap((page) => page.data.branches) || [];
  const totalDocs = data?.pages[0]?.data.pagination.totalDocs || 0;

  if (isLoading) {
    return (
      <div className="rounded-xl border border-gray-300 bg-white p-6 shadow">
<<<<<<<< HEAD:src/components/Management/ManagementRoomsList.tsx
        <p className="text-sm text-gray-600">Loading rooms...</p>
========
        <p className="text-sm text-gray-600">Loading archived branches...</p>
>>>>>>>> 0e43037dcfc5aa28b932fc17c03162fef517909f:src/components/ClassBranch/Tabs/ArchivedBranchs.tsx
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-300 bg-red-50 p-6 shadow">
<<<<<<<< HEAD:src/components/Management/ManagementRoomsList.tsx
        <p className="text-sm text-red-600">Failed to load rooms</p>
========
        <p className="text-sm text-red-600">Failed to load archived branches</p>
>>>>>>>> 0e43037dcfc5aa28b932fc17c03162fef517909f:src/components/ClassBranch/Tabs/ArchivedBranchs.tsx
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
<<<<<<<< HEAD:src/components/Management/ManagementRoomsList.tsx
          All Rooms {totalDocs ? `(${totalDocs})` : ""}
        </h2>
      </div>

      {/* no rooms message */}
      {rooms.length === 0 ? (
        <div className="rounded-xl border border-gray-300 bg-white p-6 shadow">
          <p className="text-center text-sm font-medium text-gray-600">
            No rooms available yet.
          </p>
        </div>
      ) : (
========
          Archived Branches {totalDocs ? `(${totalDocs})` : ""}
        </h2>
      </div>

      {/* no branches message */}
      {branches.length === 0 && (
        <div className="rounded-xl border border-gray-300 bg-white p-6 shadow">
          <p className="text-center text-sm font-medium text-gray-600">
            No archived branches found
          </p>
        </div>
      )}

      {/* branches */}
      {branches.length > 0 && (
>>>>>>>> 0e43037dcfc5aa28b932fc17c03162fef517909f:src/components/ClassBranch/Tabs/ArchivedBranchs.tsx
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
<<<<<<<< HEAD:src/components/Management/ManagementRoomsList.tsx
========

      {/* info message */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 shadow-sm">
        <p className="text-sm font-medium text-blue-800">
          <strong>Note:</strong> Archived branches are read-only. No one can
          join or post in these branches until they are unarchived by the
          creator or admin.
        </p>
      </div>
>>>>>>>> 0e43037dcfc5aa28b932fc17c03162fef517909f:src/components/ClassBranch/Tabs/ArchivedBranchs.tsx
    </div>
  );
};

<<<<<<<< HEAD:src/components/Management/ManagementRoomsList.tsx
export default ManagementRoomsList;
========
export default ArchivedBranches;
>>>>>>>> 0e43037dcfc5aa28b932fc17c03162fef517909f:src/components/ClassBranch/Tabs/ArchivedBranchs.tsx
