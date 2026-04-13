import { Card, Row, Col, Statistic, Typography } from "antd";
import { UserOutlined, TeamOutlined, CrownOutlined } from "@ant-design/icons";

const PerformanceUsers = () => {
  const mockUsers = [
    // Managers
    {
      id: "MGR-001",
      name: "Ahmed Mansour",
      email: "ahmed.mansour@pm.com",
      phone: "+20 123 456 789",
      role: "manager",
      roleName: "Project Manager",
      status: "active",
      registeredDate: "2024-01-15",
      lastActive: "2024-03-20",
      company: "Nile Construction",
      experience: 8,
      projectsCount: 5,
      avatarColor: "#1890ff",
      bio: "Senior project manager with 8+ years in large-scale residential projects.",
    },
    {
      id: "MGR-002",
      name: "Sara Khaled",
      email: "sara.khaled@pm.com",
      phone: "+20 987 654 321",
      role: "manager",
      roleName: "Project Manager",
      status: "active",
      registeredDate: "2024-01-20",
      lastActive: "2024-03-19",
      company: "Delta Builders",
      experience: 5,
      projectsCount: 3,
      avatarColor: "#52c41a",
      bio: "Certified PMP focusing on sustainable and eco-friendly constructions.",
    },
    {
      id: "MGR-003",
      name: "Omar Hassan",
      email: "omar.hassan@pm.com",
      phone: "+20 112 233 445",
      role: "manager",
      roleName: "Project Manager",
      status: "inactive",
      registeredDate: "2024-01-10",
      lastActive: "2024-02-28",
      company: "Pyramids Engineering",
      experience: 12,
      projectsCount: 8,
      avatarColor: "#faad14",
      bio: "Expert in infrastructure and mega projects with international experience.",
    },
    {
      id: "MGR-004",
      name: "Laila Mostafa",
      email: "laila.mostafa@pm.com",
      phone: "+20 554 433 221",
      role: "manager",
      roleName: "Project Manager",
      status: "pending",
      registeredDate: "2024-03-12",
      lastActive: "2024-03-12",
      company: "Modern Architects",
      experience: 3,
      projectsCount: 1,
      avatarColor: "#eb2f96",
      bio: "Junior PM with strong technical background in BIM software.",
    },
    // Members
    {
      id: "MBR-001",
      name: "Malak Youssef",
      email: "malak.youssef@team.com",
      phone: "+20 111 222 333",
      role: "member",
      roleName: "Team Member",
      status: "active",
      registeredDate: "2024-02-01",
      lastActive: "2024-03-20",
      skills: ["React", "Node.js", "MongoDB"],
      projectsCount: 2,
      avatarColor: "#722ed1",
    },
    {
      id: "MBR-002",
      name: "Rawan Ahmed",
      email: "rawan.ahmed@team.com",
      phone: "+20 444 555 666",
      role: "member",
      roleName: "Team Member",
      status: "active",
      registeredDate: "2024-02-05",
      lastActive: "2024-03-18",
      skills: ["UI/UX", "Figma", "Adobe XD"],
      projectsCount: 3,
      avatarColor: "#13c2c2",
    },
    {
      id: "MBR-003",
      name: "Hassan Ibrahim",
      email: "hassan.ibrahim@team.com",
      phone: "+20 777 888 999",
      role: "member",
      roleName: "Team Member",
      status: "inactive",
      registeredDate: "2024-02-10",
      lastActive: "2024-03-01",
      skills: ["Python", "Django", "PostgreSQL"],
      projectsCount: 1,
      avatarColor: "#fa8c16",
    },
    {
      id: "MBR-004",
      name: "Youssef Ali",
      email: "youssef.ali@team.com",
      phone: "+20 333 444 555",
      role: "member",
      roleName: "Team Member",
      status: "active",
      registeredDate: "2024-02-15",
      lastActive: "2024-03-19",
      skills: ["Java", "Spring Boot", "Angular"],
      projectsCount: 2,
      avatarColor: "#a0d911",
    },
    {
      id: "MBR-005",
      name: "Nour El Din",
      email: "nour.eldin@team.com",
      phone: "+20 666 777 888",
      role: "member",
      roleName: "Team Member",
      status: "pending",
      registeredDate: "2024-03-14",
      lastActive: "2024-03-14",
      skills: ["Flutter", "Firebase", "Dart"],
      projectsCount: 0,
      avatarColor: "#f759ab",
    },
  ];

  const managers = mockUsers.filter((u) => u.role === "manager");
  const members = mockUsers.filter((u) => u.role === "member");
  const activeUsers = mockUsers.filter((u) => u.status === "active");

  return (
    <div>
      <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
        <Col xs={24} sm={6}>
          <Card
            style={{
              borderRadius: "16px",
              border: "none",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
            }}
            styles={{ body: { padding: "20px" } }}
          >
            <Statistic
              title={
                <Typography.Text type="secondary">Total Users</Typography.Text>
              }
              value={mockUsers.length}
              prefix={
                <UserOutlined style={{ color: "#6366f1", fontSize: "20px" }} />
              }
              styles={{
                content: {
                  color: "#6366f1",
                  fontSize: "28px",
                  fontWeight: 600,
                },
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card
            style={{
              borderRadius: "16px",
              border: "none",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
            }}
        styles={{ body: { padding: "20px" } }}
          >
            <Statistic
              title={
                <Typography.Text type="secondary">
                  Project Managers
                </Typography.Text>
              }
              value={managers.length}
              prefix={
                <CrownOutlined style={{ color: "#f59e0b", fontSize: "20px" }} />
              }
              styles={{
                content: {
                  color: "#f59e0b",
                  fontSize: "28px",
                  fontWeight: 600,
                },
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card
            style={{
              borderRadius: "16px",
              border: "none",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
            }}
        styles={{ body: { padding: "20px" } }}
          >
            <Statistic
              title={
                <Typography.Text type="secondary">Team Members</Typography.Text>
              }
              value={members.length}
              prefix={
                <TeamOutlined style={{ color: "#10b981", fontSize: "20px" }} />
              }
              styles={{
                content: {
                  color: "#10b981",
                  fontSize: "28px",
                  fontWeight: 600,
                },
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card
            style={{
              borderRadius: "16px",
              border: "none",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
            }}
        styles={{ body: { padding: "20px" } }}
          >
            <Statistic
              title={
                <Typography.Text type="secondary">Active Now</Typography.Text>
              }
              value={activeUsers.length}
              prefix={
                <UserOutlined style={{ color: "#22c55e", fontSize: "20px" }} />
              }
              styles={{
                content: {
                  color: "#22c55e",
                  fontSize: "28px",
                  fontWeight: 600,
                },
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PerformanceUsers;
