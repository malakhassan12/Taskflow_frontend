// ==================== Ant Design  ====================

import { Col, Row } from "antd";
// ==================== Components  ====================

import ProjectCard from "./ProjectCard";

const ProjectCards = () => {
  const projectData = [
    {
      id: 1,
      title: "Website Redesign",
      status: "active",
      description: "Complete redesign of company website with modern UI",
      progress: 25,
      tasksCompleted: 1,
      totalTasks: 4,
      team: [
        { id: "e", name: "E", color: "#597ef7" },
        { id: "j", name: "J", color: "#4338ca" },
      ],
      dueDate: "2024-06-30",
    },
    {
      id: 2,
      title: "Mobile App Development",
      status: "active",
      description: "Build cross-platform mobile app using React Native",
      progress: 60,
      tasksCompleted: 6,
      totalTasks: 10,
      team: [
        { id: "a", name: "A", color: "#10b981" },
        { id: "m", name: "M", color: "#f59e0b" },
      ],
      dueDate: "2024-07-15",
    },
    {
      id: 3,
      title: "Dashboard UI Design",
      status: "completed",
      description: "Design admin dashboard with analytics and charts",
      progress: 100,
      tasksCompleted: 8,
      totalTasks: 8,
      team: [
        { id: "s", name: "S", color: "#ef4444" },
        { id: "l", name: "L", color: "#3b82f6" },
      ],
      dueDate: "2024-05-20",
    },
    {
      id: 4,
      title: "API Integration",
      status: "delayed",
      description: "Integrate third-party APIs for payments and auth",
      progress: 40,
      tasksCompleted: 2,
      totalTasks: 5,
      team: [
        { id: "k", name: "K", color: "#8b5cf6" },
        { id: "n", name: "N", color: "#14b8a6" },
      ],
      dueDate: "2024-04-10",
    },
    {
      id: 5,
      title: "E-commerce Platform",
      status: "active",
      description: "Develop full e-commerce system with cart & checkout",
      progress: 70,
      tasksCompleted: 7,
      totalTasks: 10,
      team: [
        { id: "h", name: "H", color: "#f43f5e" },
        { id: "r", name: "R", color: "#22c55e" },
      ],
      dueDate: "2024-08-01",
    },
    {
      id: 6,
      title: "Bug Fixing Sprint",
      status: "completed",
      description: "Fix critical bugs reported by QA team",
      progress: 100,
      tasksCompleted: 12,
      totalTasks: 12,
      team: [
        { id: "d", name: "D", color: "#eab308" },
        { id: "t", name: "T", color: "#6366f1" },
      ],
      dueDate: "2024-05-01",
    },
    {
      id: 7,
      title: "Authentication System",
      status: "delayed",
      description: "Implement secure login and role-based access",
      progress: 50,
      tasksCompleted: 3,
      totalTasks: 6,
      team: [
        { id: "z", name: "Z", color: "#0ea5e9" },
        { id: "b", name: "B", color: "#a855f7" },
      ],
      dueDate: "2024-03-25",
    },
    {
      id: 8,
      title: "Marketing Website",
      status: "active",
      description: "Landing pages for marketing campaigns",
      progress: 35,
      tasksCompleted: 2,
      totalTasks: 6,
      team: [
        { id: "c", name: "C", color: "#f97316" },
        { id: "x", name: "X", color: "#06b6d4" },
      ],
      dueDate: "2024-07-05",
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        {projectData.map((project, index) => (
          <Col key={project.id} xs={24} sm={12} md={12} lg={8} xl={6}>
            <div
              data-aos="fade-down"
              data-aos-delay={index * 100}
              style={{ height: "100%" }}
            >
              <ProjectCard project={project} />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProjectCards;
