import { Card, Space, Typography } from "antd";
import RequestProjectsTabs from "../../Components/Tabs/Admin/RequestProjectsTabs";

// ===== STATIC DATA =====

const ProjectsRequests = () => {
  return (
    <div style={{ padding: "24px", minHeight: "100vh" }}>
      <div data-aos="flip-left">
        <Card
          style={{
            borderRadius: 12,
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
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
                <Typography.Title
                  level={3}
                  style={{ margin: 0, fontWeight: 500 }}
                >
                  Project Requests
                </Typography.Title>
                <Typography.Text type="secondary">
                  Review and manage incoming project submissions
                </Typography.Text>
              </div>
            </div>

            {/* Tabs */}

            <RequestProjectsTabs />
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default ProjectsRequests;
