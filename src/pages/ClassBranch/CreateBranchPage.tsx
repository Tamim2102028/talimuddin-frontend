import React from "react";
import BranchForm from "../../components/ClassBranch/BranchForm";

const CreateBranchPage: React.FC = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Create New Branch</h1>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <BranchForm />
      </div>
    </>
  );
};

export default CreateBranchPage;
