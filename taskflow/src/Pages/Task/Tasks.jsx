import React from "react";
import {
  Typography,
  Row,
  Col,
  Grid,
  Space,
  Divider,
  Card,
  Statistic,
} from "antd";
import {
  UnorderedListOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

// ==================== Components ====================
import BackBtn from "../../Components/Buttons/BackBtn";
import TaskCard from "../../Components/Cards/TaskCard";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const Tasks = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const tasks = [
    {
      id: 1,
      title: "Complete Project Documentation",
      desc: "Write comprehensive documentation including API references and setup guide.",
      status: "in-progress",
      due_date: "2024-12-15",
      member: { avatar: "JD", name: "John Doe", role: "Frontend Dev" },
    },
    {
      id: 2,
      title: "Fix Login Bug",
      desc: "Resolve authentication issue users are experiencing with Google OAuth.",
      status: "pending",
      due_date: "2024-12-10",
      member: { avatar: "JS", name: "Jane Smith", role: "Backend Dev" },
    },
    {
      id: 3,
      title: "Update UI Components",
      desc: "Modernize the dashboard UI with new component library.",
      status: "completed",
      due_date: "2024-12-20",
      member: { avatar: "MJ", name: "Mike Johnson", role: "UI/UX Designer" },
    },
    {
      id: 4,
      title: "Write Unit Tests",
      desc: "Create comprehensive unit tests for all API endpoints.",
      status: "pending",
      due_date: "2024-12-25",
      member: { avatar: "SW", name: "Sarah Williams", role: "QA Engineer" },
    },
  ];

  const stats = [
    {
      title: "Total",
      value: tasks.length,
      icon: <UnorderedListOutlined />,
      color: "#1890ff",
    },
    {
      title: "Completed",
      value: tasks.filter((t) => t.status === "completed").length,
      icon: <CheckCircleOutlined />,
      color: "#52c41a",
    },
    {
      title: "In Progress",
      value: tasks.filter((t) => t.status === "in-progress").length,
      icon: <SyncOutlined spin />,
      color: "#1890ff",
    },
  ];

  return (
    <div
      style={{
        padding: isMobile ? "16px" : "32px",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: 1250, margin: "0 auto" }}>
        {/* Header Section */}
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: 24 }}
        >
          <Col>
            <Space orientation="vertical" size={0}>
              <BackBtn />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginTop: 16,
                }}
              >
                <Title level={isMobile ? 3 : 2} style={{ margin: 0 }}>
                  Project Tasks
                </Title>
              </div>
            </Space>
          </Col>
          {!isMobile && (
            <Col>
              <Text type="secondary">
                Project: <strong>Alpha Build v1.0</strong>
              </Text>
            </Col>
          )}
        </Row>

        {/* Statistics Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
          {stats.map((s, i) => (
            <Col xs={12} sm={8} key={i}>
              <Card
                styles={{ body: { padding: isMobile ? 12 : 20 } }}
                style={{ borderRadius: 12 }}
              >
                <Statistic
                  title={
                    <Text type="secondary" strong>
                      {s.title}
                    </Text>
                  }
                  value={s.value}
                  prefix={s.icon}
                  styles={{ content: { color: s.color, fontWeight: 700 } }}
                />
              </Card>
            </Col>
          ))}
        </Row>

        <Divider>Tasks List</Divider>

        {/* Tasks Grid */}
        <Row gutter={[16, 16]}>
          {tasks.map((task) => (
            <Col key={task.id} xs={24} xl={12}>
              <TaskCard task={task} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Tasks;
