import { Table } from "antd";
import ProjectsColumns from "../Columns/ProjectsColumns";

const mockProjects = [
  {
    id: "PRJ-001",
    name: "E-Commerce Platform",
    projectManager: "Ahmed Mansour",
    projectManagerId: "1",
    members: ["Malak", "Rawan", "Hassan", "Youssef"],
    numOfMembers: 4,
    status: "pending",
    submittedDate: "2024-03-15",
    desc: "A full-featured e-commerce platform with payment integration, product management, and user authentication system.",
    startTime: "2024-04-01",
    endTime: "2024-07-30",
  },
  {
    id: "PRJ-002",
    name: "Task Management App",
    projectManager: "Sara Khaled",
    projectManagerId: "2",
    members: ["Laila", "Omar", "Ahmed"],
    numOfMembers: 3,
    status: "pending",
    submittedDate: "2024-03-14",
    desc: "A productivity app for task tracking, team collaboration, and project management with real-time updates.",
    startTime: "2024-03-20",
    endTime: "2024-06-15",
  },
  {
    id: "PRJ-003",
    name: "Mobile Banking App",
    projectManager: "Omar Hassan",
    projectManagerId: "3",
    members: ["Nour", "Mohamed", "Hana", "Khaled", "Mona"],
    numOfMembers: 5,
    status: "approved",
    submittedDate: "2024-03-10",
    desc: "Secure mobile banking application with biometric authentication, transaction history, and fund transfers.",
    startTime: "2024-02-01",
    endTime: "2024-08-30",
  },
  {
    id: "PRJ-004",
    name: "AI Chatbot",
    projectManager: "Laila Mostafa",
    projectManagerId: "4",
    members: ["Ali", "Yara", "Ziad"],
    numOfMembers: 3,
    status: "rejected",
    submittedDate: "2024-03-12",
    desc: "Intelligent chatbot for customer support with natural language processing and sentiment analysis.",
    startTime: "2024-03-01",
    endTime: "2024-05-15",
  },
  {
    id: "PRJ-005",
    name: "Hotel Booking System",
    projectManager: "Mohamed Ali",
    projectManagerId: "5",
    members: ["Sara", "Ahmed", "Mona", "Hassan"],
    numOfMembers: 4,
    status: "pending",
    submittedDate: "2024-03-16",
    desc: "Complete hotel booking system with room management, online reservations, payment gateway, and admin dashboard.",
    startTime: "2024-04-10",
    endTime: "2024-09-20",
  },
];


const AllProjectsTable = ({
  handleViewProjectDetails,
  handleViewManagerDetails,
}) => {
  return (
    <Table
      columns={ProjectsColumns(
        handleViewProjectDetails,
        handleViewManagerDetails,
      )}
      dataSource={mockProjects}
      rowKey="id"
      pagination={false}
      locale={{ emptyText: "No pending project requests" }}
      scroll={{ x: 800 }}
    />
  );
};

export default AllProjectsTable;
