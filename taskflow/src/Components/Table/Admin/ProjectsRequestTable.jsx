import React, { useState } from "react";
import { message, Table } from "antd";
import ProjectsColumns from "../Columns/ProjectsColumns";
import ProjectModal from "../../Modals/ProjectModal";
import ManagerModal from "../../Modals/Admin/ManagerModal";
import useAdminMutations from "../../../Hooks/Admin/useAdminMutations";

const ProjectsRequestTable = ({ data = [] }) => {
  console.log(data);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedManager, setSelectedManager] = useState(null);

  const { approveProjectMutation, rejectProjectMutation } = useAdminMutations();

  const handleApprove = (projectId) => {
    approveProjectMutation.mutate({ projectId, newStatus: "APPROVED" });
  };

  const handleReject = async (projectId) => {
    rejectProjectMutation.mutate({ projectId, newStatus: "REJECTED" });
  };

  const handleViewProjectDetails = (record) => {
    setSelectedProject(record);
    setProjectModalOpen(true);
  };

  const handleViewManagerDetails = (manager) => {
    if (manager) {
      setSelectedManager(manager);
      setViewModalOpen(true);
    } else {
      message.info("Manager details not available");
    }
  };
  // Map backend data to table columns format
  const mappedData = data?.map((project) => ({
    id: project.id?.toString() || "",
    name: project.name || "",
    projectManager: project.maneger
      ? `${project.maneger.firstName} ${project.maneger.lastName}`
      : "",
    projectManagerId: project.manegerID?.toString() || "",
    members: project.users?.map((u) => u.firstName) || [],
    numOfMembers: project.users?.length || 0,
    status: project.status?.toLowerCase() || "PENDING",
    submittedDate: project.createdAt
      ? new Date(project.createdAt).toISOString().split("T")[0]
      : "",
    desc: project.description || "",
    startTime: project.startDate
      ? new Date(project.startDate).toISOString().split("T")[0]
      : "",
    endTime: project.endDate
      ? new Date(project.endDate).toISOString().split("T")[0]
      : "",
    manager: project?.maneger,
  }));

  console.log("Mapped data:", mappedData); // Debug log

  const hasPendingProjects = true;
  return (
    <>
      <ProjectModal
        open={projectModalOpen}
        setOpen={setProjectModalOpen}
        project={selectedProject}
      />

      {/* Manager Details Modal */}
      <ManagerModal
        viewModalOpen={viewModalOpen}
        setViewModalOpen={setViewModalOpen}
        selectedManager={selectedManager}
      />
      <Table
        columns={ProjectsColumns(
          handleViewProjectDetails,
          handleViewManagerDetails,
          handleApprove,
          handleReject,
          hasPendingProjects,
        )}
        dataSource={mappedData}
        rowKey="id"
        pagination={false}
        locale={{ emptyText: "No pending project requests" }}
        scroll={{ x: 800 }}
      />
    </>
  );
};

export default ProjectsRequestTable;
