import { Table, Card, Space, Typography } from "antd";
import UsersTabs from "../../Components/Tabs/Admin/UsersTabs";
import PerformanceUsers from "../../Components/Analytics/Admin/PerformanceUsers";

const { Title, Text } = Typography;

// ===== STATIC DATA =====

const UsersManagement = () => {
  return (
    <div style={{ padding: "24px", minHeight: "100vh" }}>
      <div data-aos="zoom-out">
        {/* Statistics Cards */}

        <PerformanceUsers />
        {/* Main Card */}
        <Card
          style={{
            borderRadius: "20px",
            border: "none",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
            overflow: "hidden",
          }}
          styles={{ body: { padding: "0" } }}
        >
          {/* Header */}
          <div
            style={{
              padding: "24px 24px 0 24px",
              borderBottom: "1px solid #f1f5f9",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <Space orientation="vertical" size={4}>
                <Title
                  level={4}
                  style={{ margin: 0, fontWeight: 600, color: "#1e293b" }}
                >
                  User Management
                </Title>
                <Text type="secondary" style={{ fontSize: "14px" }}>
                  Manage all users in the system (Managers & Members)
                </Text>
              </Space>
            </div>
          </div>

          <UsersTabs />
        </Card>
      </div>
    </div>
  );
};

export default UsersManagement;
