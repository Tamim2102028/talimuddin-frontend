import React from "react";
import type { Branch, BranchMeta } from "../../../types";
import BranchDetailsNavBar from "./BranchDetailsNavBar";

interface BranchHeaderProps {
  Branch: Branch;
  meta: BranchMeta;
}

const BranchHeader: React.FC<BranchHeaderProps> = ({ Branch, meta }) => {
  return (
    <div className="relative">
      <img
        src={Branch.coverImage}
        alt={Branch.name}
        className="h-64 w-full object-cover"
      />

      <div className="mx-auto max-w-5xl px-4">
        <div className="relative -mt-20">
          <div className="rounded-2xl bg-white px-5 pt-5 shadow-lg">
            <div className="flex flex-col items-start gap-6">
              <div className="w-full flex-1">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Name */}
                    <div className="flex items-center gap-3">
                      <h1 className="text-3xl font-bold text-gray-900">
                        {Branch.name}
                      </h1>
                    </div>

                    {/* member and post count */}
                    <p className="mt-1 text-gray-600">
                      {Branch.membersCount === 1 ? "Member" : "Members"} (
                      {Branch.membersCount.toLocaleString()}) {" - "}
                      {Branch.postsCount === 1 ? "Post" : "Posts"} (
                      {Branch.postsCount.toLocaleString()})
                    </p>
                  </div>

                  {/* Join Code Display */}
                  {meta.joinCode && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(meta.joinCode!);
                            // You can add toast notification here if needed
                          } catch (error) {
                            console.error("Failed to copy:", error);
                          }
                        }}
                        className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 transition-all hover:border-blue-400 hover:bg-blue-50 hover:shadow-sm"
                        title="Click to copy join code"
                      >
                        <span className="font-mono text-sm font-semibold text-gray-700">
                          {meta.joinCode}
                        </span>
                      </button>
                    </div>
                  )}
                </div>

                {Branch.description && (
                  <p className="mt-4 text-gray-700">{Branch.description}</p>
                )}
                <BranchDetailsNavBar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchHeader;
