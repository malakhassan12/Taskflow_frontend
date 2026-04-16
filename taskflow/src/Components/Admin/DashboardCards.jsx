// ==================== Ant Design ====================
import { Card, Col, Row, Progress, Typography, Tag } from "antd";
// ==================== Icons ====================
import { ShieldCheck, UserCog, Users, Clock, FolderOpen, ClipboardList, CheckCircle, PauseCircle, AlertCircle } from "lucide-react";

const { Title, Text } = Typography;

const DashboardCards = () => {
  const usersData = [
    { label: "Admins", value: 1, color: "#3b82f6", icon: <ShieldCheck size={20} /> },
    { label: "Project Managers", value: 2, color: "#8b5cf6", icon: <UserCog size={20} /> },
    { label: "Team Members", value: 3, color: "#22c55e", icon: <Users size={20} /> },
  ];

  const projectsData = [
    { label: "Active", value: 2, color: "#22c55e", icon: <FolderOpen size={20} /> },
    { label: "Planning", value: 1, color: "#3b82f6", icon: <ClipboardList size={20} /> },
    { label: "Completed", value: 0, color: "#8b5cf6", icon: <CheckCircle size={20} /> },
    { label: "On Hold", value: 0, color: "#f97316", icon: <PauseCircle size={20} /> },
  ];

  const tasksData = [
    { label: "To Do", value: 3, color: "#6b7280", icon: <AlertCircle size={20} /> },
    { label: "In Progress", value: 3, color: "#3b82f6", icon: <Clock size={20} /> },
    { label: "Completed", value: 2, color: "#22c55e", icon: <CheckCircle size={20} /> },
  ];

  return (
    <div style={{ marginTop: "32px" }}>
      <Row gutter={[16, 16]}>
        {/* Users Breakdown Card */}
        <Col xs={24} lg={8}>
          <Card
            title={
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Users size={24} color="#3b82f6" />
                <Title level={4} style={{ margin: 0 }}>Users Breakdown</Title>
              </div>
            }
            style={{ height: "100%" }}
          >
            <div style={{ marginBottom: "24px" }}>
              {usersData.map((item, index) => (
                <div key={index} style={{ marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ color: item.color }}>{item.icon}</div>
                      <Text strong>{item.label}</Text>
                    </div>
                    <Text strong style={{ color: item.color }}>{item.value}</Text>
                  </div>
                  <Progress
                    percent={item.value * 25}
                    showInfo={false}
                    strokeColor={item.color}
                    trailColor="#f3f4f6"
                    size={{ strokeWidth: 8 }}
                  />
                </div>
              ))}
            </div>
            <div
              style={{
                padding: "16px",
                background: "#fef3c7",
                borderRadius: "12px",
                borderLeft: "4px solid #f97316",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Text strong style={{ color: "#92400e" }}>Pending Approvals</Text>
                <Tag color="orange" style={{ margin: 0 }}>1</Tag>
              </div>
            </div>
          </Card>
        </Col>

        {/* Projects Status Card */}
        <Col xs={24} lg={8}>
          <Card
            title={
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FolderOpen size={24} color="#8b5cf6" />
                <Title level={4} style={{ margin: 0 }}>Projects Status</Title>
              </div>
            }
            style={{ height: "100%" }}
          >
            <div>
              {projectsData.map((item, index) => (
                <div key={index} style={{ marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ color: item.color }}>{item.icon}</div>
                      <Text strong>{item.label}</Text>
                    </div>
                    <Text strong style={{ color: item.color }}>{item.value}</Text>
                  </div>
                  <Progress
                    percent={item.value * 25}
                    showInfo={false}
                    strokeColor={item.color}
                    trailColor="#f3f4f6"
                    size={{ strokeWidth: 8 }}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* Tasks Status Card */}
        <Col xs={24} lg={8}>
          <Card
            title={
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ClipboardList size={24} color="#22c55e" />
                <Title level={4} style={{ margin: 0 }}>Tasks Status</Title>
              </div>
            }
            style={{ height: "100%" }}
          >
            <div style={{ marginBottom: "24px" }}>
              {tasksData.map((item, index) => (
                <div key={index} style={{ marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ color: item.color }}>{item.icon}</div>
                      <Text strong>{item.label}</Text>
                    </div>
                    <Text strong style={{ color: item.color }}>{item.value}</Text>
                  </div>
                  <Progress
                    percent={item.value * 25}
                    showInfo={false}
                    strokeColor={item.color}
                    trailColor="#f3f4f6"
                    size={{ strokeWidth: 8 }}
                  />
                </div>
              ))}
            </div>
            <div
              style={{
                padding: "16px",
                background: "#dcfce7",
                borderRadius: "12px",
                borderLeft: "4px solid #22c55e",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Text strong style={{ color: "#166534" }}>Overall Progress</Text>
                <Tag color="green" style={{ margin: 0 }}>25%</Tag>
              </div>
              <Progress
                percent={25}
                showInfo={false}
                strokeColor="#22c55e"
                trailColor="#bbf7d0"
                size={{ strokeWidth: 8 }}
                style={{ marginTop: "8px" }}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardCards;
