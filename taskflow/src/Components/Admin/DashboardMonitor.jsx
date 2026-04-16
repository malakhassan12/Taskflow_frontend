// ==================== Ant Design ====================
import { Col, Row, Typography } from "antd";
// ==================== Icons ====================
import { Users, UserCog, UsersRound, FolderKanban, CheckSquare, TrendingUp } from "lucide-react";

const { Title } = Typography;

const DashboardMonitor = () => {
  const stats = [
    {
      title: "Total Users",
      value: "2,543",
      description: "Active users in system",
      icon: <Users size={32} />,
      color: "#3b82f6",
      bgColor: "#dbeafe",
    },
    {
      title: "Project Managers",
      value: "156",
      description: "Managing projects",
      icon: <UserCog size={32} />,
      color: "#8b5cf6",
      bgColor: "#ede9fe",
    },
    {
      title: "Team Members",
      value: "1,847",
      description: "Working on tasks",
      icon: <UsersRound size={32} />,
      color: "#22c55e",
      bgColor: "#dcfce7",
    },
    {
      title: "Total Projects",
      value: "328",
      description: "Active projects",
      icon: <FolderKanban size={32} />,
      color: "#14b8a6",
      bgColor: "#ccfbf1",
    },
    {
      title: "Total Tasks",
      value: "1,892",
      description: "Tasks assigned",
      icon: <CheckSquare size={32} />,
      color: "#f97316",
      bgColor: "#ffedd5",
    },
    {
      title: "Overall Progress",
      value: "78%",
      description: "Completion rate",
      icon: <TrendingUp size={32} />,
      color: "#ec4899",
      bgColor: "#fce7f3",
    },
  ];

  return (
    <div>
      <Title level={3} style={{ marginBottom: "24px" }}>
        Dashboard Overview
      </Title>
      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={8} xl={4}>
            <div
              style={{
                background: stat.bgColor,
                borderRadius: "16px",
                padding: "24px",
                height: "100%",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "12px",
                    background: stat.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  {stat.icon}
                </div>
              </div>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  color: stat.color,
                  marginBottom: "8px",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "4px",
                }}
              >
                {stat.title}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                }}
              >
                {stat.description}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DashboardMonitor;
