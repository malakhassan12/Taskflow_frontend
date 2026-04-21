import React from "react";
import { Table } from "antd";
import ProjectsColumns from "../Columns/ProjectsColumns";

const ProjectsRequestTable = ({
  data = [],
  handleViewProjectDetails,
  handleViewManagerDetails,
  handleApprove,
  handleReject,
}) => {
  // Map backend data to table columns format
  const mappedData = data.map((project) => ({
    id: project.id?.toString() || "",
    name: project.name || "",
    projectManager: project.maneger
      ? `${project.maneger.firstName} ${project.maneger.lastName}`
      : "",
    projectManagerId: project.manegerID?.toString() || "",
    members: project.users?.map((u) => u.firstName) || [],
    numOfMembers: project.users?.length || 0,
    status: project.status?.toLowerCase() || "pending",
    submittedDate: project.createdAt ? new Date(project.createdAt).toISOString().split('T')[0] : "",
    desc: project.description || "",
    startTime: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : "",
    endTime: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : "",
  }));

  return (
    <Table
      columns={ProjectsColumns(
        handleViewProjectDetails,
        handleViewManagerDetails,
        handleApprove,
        handleReject,
      )}
      dataSource={mappedData}
      rowKey="id"
      pagination={false}
      locale={{ emptyText: "No pending project requests" }}
      scroll={{ x: 800 }}
    />
  );
};

export default ProjectsRequestTable;
