import { Card, Space, Typography } from "antd";
import ManagersTabs from "../../Components/Tabs/Admin/ManagersTabs";

const { Title, Text } = Typography;

// ===== MAIN COMPONENT =====
const ManagersManagement = () => {
  return (
    <div style={{ padding: "24px", minHeight: "100vh" }}>
      <div data-aos="fade-right">
        <Card
          style={{
            borderRadius: 12,
            boxShadow:
              "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
          }}
          styles={{ body: { padding: "24px" } }}
        >
          <Space orientation="vertical" size="large" style={{ width: "100%" }}>
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Title level={3} style={{ margin: 0, fontWeight: 500 }}>
                  Project Managers
                </Title>
                <Text type="secondary">
                  Manage registrations and access for project managers
                </Text>
              </div>
            </div>

            {/* Tabs for Pending vs All */}
            <ManagersTabs />
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default ManagersManagement;
