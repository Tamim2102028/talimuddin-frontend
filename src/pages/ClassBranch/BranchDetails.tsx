import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { branchHooks } from "../../hooks/useBranch";
import BranchHeader from "../../components/ClassBranch/details-page/BranchHeader";
import branchPosts from "../../components/ClassBranch/Branch-tabs-inside/branchPosts";
import branchMembersTab from "../../components/ClassBranch/Branch-tabs-inside/branchMembersTab";
import BranchAbout from "../../components/ClassBranch/Branch-tabs-inside/BranchAbout";
import BranchFiles from "../../components/ClassBranch/Branch-tabs-inside/BranchFiles";

const BranchDetails: React.FC = () => {
  const { branchId } = useParams<{ branchId: string }>();
  const {
    data: response,
    isLoading,
    error,
  } = branchHooks.useBranchDetails(branchId);

  const Branch = response?.data?.Branch;
  const meta = response?.data?.meta;

  // Loading State
  if (isLoading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
        <p className="text-gray-600">Loading Branch details...</p>
      </div>
    );
  }

  // Error State or Not Found
  if (error || !Branch || !meta) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">Branch Not Found</h2>
        <p className="mt-2 text-gray-600">
          The Branch you're looking for doesn't exist or has been removed.
        </p>
        <div className="mt-4">
          <Link to="/ClassBranch" className="text-blue-600 hover:underline">
            Back to Branches
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 overflow-hidden">
      <BranchHeader Branch={Branch} meta={meta} />

      <div className="mx-auto max-w-5xl">
        <div className="space-y-3 rounded-xl shadow">
          <Routes>
            <Route index element={<branchPosts />} />
            <Route path="members" element={<branchMembersTab />} />
            <Route path="files" element={<BranchFiles />} />
            <Route path="about" element={<BranchAbout Branch={Branch} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default BranchDetails;
