import { Row, Col } from "antd";
import {
  FaFolder,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";
// ==================== Components  ====================

import GeneralCard from "./GeneralCard";

const ManagerCards = () => {
  // From the API
  const projects = [
    { id: 1, status: "active" },
    { id: 2, status: "completed" },
    { id: 3, status: "delayed" },
  ];

  const totalProjects = projects.length;
  const activeProjects = projects.filter((p) => p.status === "active").length;
  const completedProjects = projects.filter(
    (p) => p.status === "completed",
  ).length;
  const delayedProjects = projects.filter((p) => p.status === "delayed").length;

  const cards = [
    {
      title: "Total Projects",
      icon: <FaFolder />,
      value: totalProjects,
      color: "#3b82f6",
    },
    {
      title: "Active Projects",
      icon: <FaClock />,
      value: activeProjects,
      color: "#f59e0b",
      progress: totalProjects ? (activeProjects / totalProjects) * 100 : 0,
    },
    {
      title: "Completed Projects",
      icon: <FaCheckCircle />,
      value: completedProjects,
      color: "#22c55e",
    },
    {
      title: "Delayed Projects",
      icon: <FaExclamationTriangle />,
      value: delayedProjects,
      color: "#ef4444",
      progress: totalProjects ? (delayedProjects / totalProjects) * 100 : 0,
    },
  ];

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
      {cards.map((card, index) => (
        <Col xs={24} sm={12} lg={6} key={index}>
          <div data-aos="fade-down" data-aos-delay={index * 100}>
            <GeneralCard {...card} />
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default ManagerCards;
