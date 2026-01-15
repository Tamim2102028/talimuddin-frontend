import React from "react";
import ManagementHeader from "../../components/Management/ManagementHeader";
import ManagementRoomsList from "../../components/Management/ManagementRoomsList";

const ManagementPage: React.FC = () => {
  return (
    <>
      <ManagementHeader />
      <ManagementRoomsList />
    </>
  );
};

export default ManagementPage;
