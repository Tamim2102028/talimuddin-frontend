import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/ClassBranch/Header";
import Branches from "../components/ClassBranch/Tabs/Branchs";
import PageLoader from "./Fallbacks/PageLoader";

// Lazy load pages
const BranchDetails = lazy(() => import("./ClassBranch/BranchDetails"));
const CreateBranchPage = lazy(() => import("./ClassBranch/CreateBranchPage"));
const JoinBranchPage = lazy(() => import("./ClassBranch/JoinBranchPage"));
const EditBranchPage = lazy(() => import("./ClassBranch/EditBranchPage"));

const ClassBranch: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* All Branches - Default */}
        <Route
          index
          element={
            <>
              <Header />
              <Branches type="all" />
            </>
          }
        />

        {/* My Branches */}
        <Route
          path="my"
          element={
            <>
              <Header />
              <Branches type="my" />
            </>
          }
        />

        {/* Standalone Routes (No Header) */}
        <Route path="createbranch" element={<CreateBranchPage />} />
        <Route path="joinbranch" element={<JoinBranchPage />} />
        <Route path="branches/:branchId/edit" element={<EditBranchPage />} />
        <Route path="branches/:branchId/*" element={<BranchDetails />} />
      </Routes>
    </Suspense>
  );
};

export default ClassBranch;
