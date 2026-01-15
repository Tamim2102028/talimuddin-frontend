import React from "react";
<<<<<<<< HEAD:src/components/ClassBranch/AllRoomsList.tsx
import RoomCard from "./RoomCard";
import { roomHooks } from "../../hooks/useRoom";
import type { RoomListItem } from "../../types";

const AllRoomsList: React.FC = () => {
========
import BranchCard from "../BranchCard";
import { branchHooks } from "../../../hooks/useBranch";
import type { BranchListItem } from "../../../types";

const HiddenBranches: React.FC = () => {
>>>>>>>> 0e43037dcfc5aa28b932fc17c03162fef517909f:src/components/ClassBranch/Tabs/HiddenBranchs.tsx
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
<<<<<<<< HEAD:src/components/ClassBranch/AllRoomsList.tsx
  } = roomHooks.useAllRooms();
========
  } = branchHooks.useHiddenBranches();
>>>>>>>> 0e43037dcfc5aa28b932fc17c03162fef517909f:src/components/ClassBranch/Tabs/HiddenBranchs.tsx

  const branches: BranchListItem[] =
    data?.pages.flatMap((page) => page.data.branches) || [];
  const totalDocs = data?.pages[0]?.data.pagination.totalDocs || 0;

  if (isLoading) {
    return (
      <div className="rounded-xl border border-gray-300 bg-white p-6 shadow">
<<<<<<<< HEAD:src/components/ClassBranch/AllRoomsList.tsx
        <p className="text-sm text-gray-600">Loading rooms...</p>
========
        <p className="text-sm text-gray-600">Loading hidden branches...</p>
>>>>>>>> 0e43037dcfc5aa28b932fc17c03162fef517909f:src/components/ClassBranch/Tabs/HiddenBranchs.tsx
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-300 bg-red-50 p-6 shadow">
<<<<<<<< HEAD:src/components/ClassBranch/AllRoomsList.tsx
        <p className="text-sm text-red-600">Failed to load rooms</p>
========
        <p className="text-sm text-red-600">Failed to load hidden branches</p>
>>>>>>>> 0e43037dcfc5aa28b932fc17c03162fef517909f:src/components/ClassBranch/Tabs/HiddenBranchs.tsx
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
<<<<<<<< HEAD:src/components/ClassBranch/AllRoomsList.tsx
          All Rooms {totalDocs ? `(${totalDocs})` : ""}
========
          Hidden Branches {totalDocs ? `(${totalDocs})` : ""}
>>>>>>>> 0e43037dcfc5aa28b932fc17c03162fef517909f:src/components/ClassBranch/Tabs/HiddenBranchs.tsx
        </h2>
      </div>

      {/* no branches message */}
      {branches.length === 0 ? (
        <div className="rounded-xl border border-gray-300 bg-white p-6 shadow">
          <p className="text-center text-sm font-medium text-gray-600">
<<<<<<<< HEAD:src/components/ClassBranch/AllRoomsList.tsx
            No rooms available yet.
========
            No hidden branches. You can hide branches from the Branch details
            page menu.
>>>>>>>> 0e43037dcfc5aa28b932fc17c03162fef517909f:src/components/ClassBranch/Tabs/HiddenBranchs.tsx
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

<<<<<<<< HEAD:src/components/ClassBranch/AllRoomsList.tsx
export default AllRoomsList;
========
export default HiddenBranches;
>>>>>>>> 0e43037dcfc5aa28b932fc17c03162fef517909f:src/components/ClassBranch/Tabs/HiddenBranchs.tsx
