// ==================== Ant Design ====================

import { Progress, Card, Row, Col, Typography, Statistic } from "antd";
import { CheckOutlined, FileTextOutlined } from "@ant-design/icons";

// ==================== Constants ====================
import { green, primaryColor } from "../../../Constants/Colors";

const { Title, Text } = Typography;

const PerformanceTasksPerMember = () => {
  const tasks = [
    {
      id: 1,
      title: "Sample Task 1",
      description: "Task description here",
      status: "pending", // pending, in-progress, completed, rejected
      approved: false,
      createdAt: "2024-01-01",
      dueDate: "2024-01-15",
      completedAt: null,
      priority: 0,
    },
    {
      id: 2,
      title: "Sample Task 2",
      description: "Task description here",
      status: "in-progress",
      approved: false,
      createdAt: "2024-01-01",
      dueDate: "2024-01-20",
      completedAt: null,
      priority: 0,
    },
  ];
  // ============ PERFORMANCE CALCULATIONS - Replace with API data later ============
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const approvedTasks = tasks.filter((t) => t.approved === true).length;
  const pendingTasks = tasks.filter((t) => t.status === "pending").length;
  const inProgressTasks = tasks.filter(
    (t) => t.status === "in-progress",
  ).length;

  const completionRate =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const approvalRate =
    completedTasks > 0 ? (approvedTasks / completedTasks) * 100 : 0;

  const totalpriority = tasks.reduce((sum, t) => sum + t.priority, 0);
  const earnedpriority = tasks
    .filter((t) => t.status === "completed" && t.approved)
    .reduce((sum, t) => sum + t.priority, 0);

  const performanceScore =
    totalpriority > 0 ? (earnedpriority / totalpriority) * 100 : 0;

  return (
    <Card style={{ marginBottom: 20 }}>
      <Title level={4}>Performance Overview</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Completion Rate"
              value={completionRate.toFixed(1)}
              suffix="%"
              prefix={<CheckOutlined />}
            />
            <Progress
              percent={completionRate}
              size="small"
              status={completionRate === 100 ? "success" : "active"}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Approval Rate"
              value={approvalRate.toFixed(1)}
              suffix="%"
              prefix={<CheckOutlined />}
            />
            <Progress
              percent={approvalRate}
              size="small"
              status={approvalRate === 100 ? "success" : "active"}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Performance Score"
              value={performanceScore.toFixed(1)}
              suffix="%"
              prefix={<FileTextOutlined />}
            />
            <Progress
              percent={performanceScore}
              size="small"
              strokeColor={primaryColor}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Row gutter={8}>
              <Col span={12}>
                <Statistic
                  title="Completed"
                  value={completedTasks}
                  suffix={`/ ${totalTasks}`}
                  styles={{ content: { color: green } }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Approved"
                  value={approvedTasks}
                  suffix={`/ ${completedTasks}`}
                  styles={{ content: { color: green } }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Task Summary Stats */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Text type="secondary">Pending Tasks</Text>
            <Title level={3} style={{ margin: 0 }}>
              {pendingTasks}
            </Title>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Text type="secondary">In Progress</Text>
            <Title level={3} style={{ margin: 0 }}>
              {inProgressTasks}
            </Title>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Text type="secondary">Earned priority</Text>
            <Title level={3} style={{ margin: 0 }}>
              {earnedpriority} / {totalpriority}
            </Title>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default PerformanceTasksPerMember;
