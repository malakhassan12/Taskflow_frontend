// ==================== Ant Design ====================
import { Progress, Card, Row, Col, Typography, Statistic } from "antd";
import {
  CheckOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

// ==================== Constants ====================
import { green, primaryColor } from "../../../Constants/Colors";
import useGetTasksStatus from "../../../Hooks/Task/useGetTasksStatus";

const { Title, Text } = Typography;

const PerformanceTasksPerMember = ({ tasks = [], projectId }) => {
  const { data = [] } = useGetTasksStatus(tasks, projectId);

  console.log("Tasks received:", tasks);

  // Calculate stats from tasks prop
  const totalTasks = data?.length;

  // Status counts (based on your actual status values)
  const completedTasks = data?.filter((t) => t.status === "done").length;
  const inProgressTasks = data?.filter(
    (t) => t.status === "in_progress",
  ).length;
  const todoTasks = data?.filter((t) => t.status === "todo").length;

  // Approval stats
  const approvedTasks = data?.filter((t) => t.approved === true).length;
  const rejectedTasks = data?.filter((t) => t.approved === false).length;

  // Priority-based stats
  const totalPriority = data?.reduce((sum, t) => sum + (t.priority || 0), 0);
  const earnedPriority = data
    ?.filter((t) => t.status === "done" && t.approved === true)
    .reduce((sum, t) => sum + (t.priority || 0), 0);

  // Calculate rates
  const completionRate =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const approvalRate =
    completedTasks > 0 ? (approvedTasks / completedTasks) * 100 : 0;
  const performanceScore =
    totalPriority > 0 ? (earnedPriority / totalPriority) * 100 : 0;

  return (
    <Card style={{ marginBottom: 20, borderRadius: 12 }}>
      <Title level={4} style={{ marginBottom: 16 }}>
        Performance Overview
      </Title>

      <Row gutter={[16, 16]}>
        {/* Completion Rate */}
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="Completion Rate"
              value={completionRate.toFixed(1)}
              suffix="%"
              prefix={<CheckOutlined />}
              styles={{
                content: { color: green },
              }}
            />
            <Progress
              percent={completionRate}
              size="small"
              strokeColor={green}
              showInfo={false}
            />
          </Card>
        </Col>

        {/* Approval Rate */}
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="Approval Rate"
              value={approvalRate.toFixed(1)}
              suffix="%"
              prefix={<CheckOutlined />}
              styles={{
                content: { color: primaryColor },
              }}
            />
            <Progress
              percent={approvalRate}
              size="small"
              strokeColor={primaryColor}
              showInfo={false}
            />
          </Card>
        </Col>

        {/* Performance Score */}
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
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
              showInfo={false}
            />
          </Card>
        </Col>

        {/* Task Summary */}
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Row gutter={8}>
              <Col span={12}>
                <Statistic
                  title="Total Tasks"
                  value={totalTasks}
                  styles={{
                    content: { color: primaryColor, fontSize: 20 },
                  }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Completed"
                  value={completedTasks}
                  styles={{
                    content: { color: green, fontSize: 20 },
                  }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Status Distribution */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} sm={8}>
          <Card size="small">
            <Text type="secondary">📋 To Do</Text>
            <Title level={3} style={{ margin: 0, color: "#faad14" }}>
              {todoTasks}
            </Title>
            <Progress
              percent={totalTasks > 0 ? (todoTasks / totalTasks) * 100 : 0}
              size="small"
              strokeColor="#faad14"
              showInfo={false}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card size="small">
            <Text type="secondary">⚡ In Progress</Text>
            <Title level={3} style={{ margin: 0, color: "#1890ff" }}>
              {inProgressTasks}
            </Title>
            <Progress
              percent={
                totalTasks > 0 ? (inProgressTasks / totalTasks) * 100 : 0
              }
              size="small"
              strokeColor="#1890ff"
              showInfo={false}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card size="small">
            <Text type="secondary">✅ Completed</Text>
            <Title level={3} style={{ margin: 0, color: green }}>
              {completedTasks}
            </Title>
            <Progress
              percent={completionRate}
              size="small"
              strokeColor={green}
              showInfo={false}
            />
          </Card>
        </Col>
      </Row>

      {/* Priority & Approval Stats */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} sm={12}>
          <Card size="small">
            <Text type="secondary">Earned / Total Priority</Text>
            <Title level={3} style={{ margin: 0, fontSize: 20 }}>
              {earnedPriority} / {totalPriority}
            </Title>
            <Progress
              percent={performanceScore}
              size="small"
              strokeColor={primaryColor}
              showInfo={false}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card size="small">
            <Row gutter={8}>
              <Col span={12}>
                <Statistic
                  title="Approved Tasks"
                  value={approvedTasks}
                  styles={{
                    content: { color: green, fontSize: 20 },
                  }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Rejected Tasks"
                  value={rejectedTasks}
                  styles={{
                    content: { color: "#ff4d4f", fontSize: 20 },
                  }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default PerformanceTasksPerMember;
