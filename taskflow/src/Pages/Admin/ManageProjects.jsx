import React, { useState } from "react";
import AllProjectsTable from "../../Components/Table/Admin/AllProjectsTable";
import ProjectModal from "../../Components/Modals/ProjectModal";
import ManagerModal from "../../Components/Modals/Admin/ManagerModal";
import { message } from "antd";
import { updateProjectStatus } from "../../Api/api/manager.api";
import { useRef } from "react";

// Mock manager data for the modal

const ManageProjects = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedManager, setSelectedManager] = useState(null);
  const tableRef = useRef(null);

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
  const handleApprove = async (projectId) => {
    try {
      await updateProjectStatus(parseInt(projectId), "APPROVED");
      message.success("Project approved successfully");
      if (tableRef.current) {
        tableRef.current.refresh();
      }
    } catch (error) {
      console.error("Error approving project:", error);
      message.error("Failed to approve project");
    }
  };

  const handleReject = async (projectId) => {
    try {
      await updateProjectStatus(parseInt(projectId), "REJECTED");
      message.warning("Project rejected successfully");
      if (tableRef.current) {
        tableRef.current.refresh();
      }
    } catch (error) {
      console.error("Error rejecting project:", error);
      message.error("Failed to reject project");
    }
  };

  return (
    <>
      <div
        data-aos="fade-left"
        data-aos-anchor="#example-anchor"
        data-aos-offset="500"
        data-aos-duration="500"
      >
        {/* Project Details Modal */}
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
        <AllProjectsTable
          // ref={tableRef}
          handleViewProjectDetails={handleViewProjectDetails}
          handleViewManagerDetails={handleViewManagerDetails}
          handleApprove={handleApprove}
          handleReject={handleReject}
        />
      </div>
    </>
  );
};

export default ManageProjects;
