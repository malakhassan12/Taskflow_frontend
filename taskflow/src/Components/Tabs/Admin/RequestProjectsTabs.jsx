import React, { useState } from "react";
import {
 
  Badge,
  message,
  Tabs,
} from "antd";

import ProjectModal from "../../../Components/Modals/ProjectModal";
import ManagerModal from "../../../Components/Modals/Admin/ManagerModal";
import ProjectsRequestTable from "../../Table/Admin/ProjectsRequestTable";
import AllProjectsTable from "../../Table/Admin/AllProjectsTable";


// ===== STATIC DATA =====

// Mock manager data for the modal
const mockManagers = [
  {
    id: "1",
    name: "Ahmed Mansour",
    email: "ahmed.mansour@pm.com",
    phone: "+20 123 456 789",
    company: "Nile Construction",
    experience: 8,
    status: "approved",
    registeredDate: "2024-03-15",
    avatarColor: "#1890ff",
    bio: "Senior project manager with 8+ years in large-scale residential projects.",
  },
  {
    id: "2",
    name: "Sara Khaled",
    email: "sara.khaled@pm.com",
    phone: "+20 987 654 321",
    company: "Delta Builders",
    experience: 5,
    status: "approved",
    registeredDate: "2024-03-14",
    avatarColor: "#52c41a",
    bio: "Certified PMP focusing on sustainable and eco-friendly constructions.",
  },
  {
    id: "3",
    name: "Omar Hassan",
    email: "omar.hassan@pm.com",
    phone: "+20 112 233 445",
    company: "Pyramids Engineering",
    experience: 12,
    status: "approved",
    registeredDate: "2024-03-10",
    avatarColor: "#faad14",
    bio: "Expert in infrastructure and mega projects with international experience.",
  },
  {
    id: "4",
    name: "Laila Mostafa",
    email: "laila.mostafa@pm.com",
    phone: "+20 554 433 221",
    company: "Modern Architects",
    experience: 3,
    status: "pending",
    registeredDate: "2024-03-12",
    avatarColor: "#eb2f96",
    bio: "Junior PM with strong technical background in BIM software.",
  },
  {
    id: "5",
    name: "Mohamed Ali",
    email: "mohamed.ali@pm.com",
    phone: "+20 667 788 990",
    company: "Future Tech",
    experience: 6,
    status: "approved",
    registeredDate: "2024-03-11",
    avatarColor: "#722ed1",
    bio: "Experienced PM in software development and agile methodologies.",
  },
];

const RequestProjectsTabs = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedManager, setSelectedManager] = useState(null);

  const handleViewProjectDetails = (record) => {
    setSelectedProject(record);
    setProjectModalOpen(true);
  };

  const handleViewManagerDetails = (managerName, ) => {
    // Find the manager by name
    const manager = mockManagers.find((m) => m.name === managerName);
    if (manager) {
      setSelectedManager(manager);
      setViewModalOpen(true);
    } else {
      message.info("Manager details not available");
    }
  };


  const tabItems = [
    {
      key: "pending",
      label: (
        <span>
          Pending Approval <Badge count={2} offset={[10, -2]} size="small" />
        </span>
      ),
      children: (
        <ProjectsRequestTable
          handleViewProjectDetails={handleViewProjectDetails}
          handleViewManagerDetails={handleViewManagerDetails}
        />
      ),
    },
    {
      key: "all",
      label: "All Managers",
      children: (
        <AllProjectsTable
          handleViewProjectDetails={handleViewProjectDetails}
          handleViewManagerDetails={handleViewManagerDetails}
        />
      ),
    },
  ];

  return (
    <>
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
      <Tabs
        defaultActiveKey="pending"
        size="large"
        items={tabItems}
        animated={{ inkBar: true, tabPane: true }}
      />
    </>
  );
};

export default RequestProjectsTabs;
