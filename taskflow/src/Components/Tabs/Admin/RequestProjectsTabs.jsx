import React from "react";
import {  Tabs, Spin, Empty } from "antd";
import ProjectModal from "../../../Components/Modals/ProjectModal";
import ManagerModal from "../../../Components/Modals/Admin/ManagerModal";
import ProjectsRequestTable from "../../Table/Admin/ProjectsRequestTable";
import TableSkeleton from "../../Skelton/TableSkelton";
import useGetPendingRequests from "../../../Hooks/Admin/useGetPendingRequests";

const RequestProjectsTabs = () => {
  const { data: pendingProjects = [], isLoading } = useGetPendingRequests();

  console.log(pendingProjects);

 

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <>
      {/* Project Details Modal */}

      {pendingProjects?.length !== 0 ? (
        <ProjectsRequestTable
          data={pendingProjects}
          loading={isLoading}
        />
      ) : (
        <Empty
          description="No pending projects found"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
    </>
  );
};

export default RequestProjectsTabs;
