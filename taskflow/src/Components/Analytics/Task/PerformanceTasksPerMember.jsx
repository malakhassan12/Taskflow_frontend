// ==================== Ant Design ====================
import { Progress, Card, Row, Col, Typography, Statistic } from "antd";
import { CheckOutlined, FileTextOutlined, ClockCircleOutlined } from "@ant-design/icons";

// ==================== Constants ====================
import { green, primaryColor } from "../../../Constants/Colors";

const { Title, Text } = Typography;

const PerformanceTasksPerMember = ({ tasks = [] }) => {
  // Calculate stats from props
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const approvedTasks = tasks.filter((t) => t.approved === true).length;
  const pendingTasks = tasks.filter((t) => t.status === "pending").length;
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress").length;
  
  // Calculate priority-based stats
  const totalPriority = tasks.reduce((sum, t) => sum + (t.priority || 0), 0);
  const earnedPriority = tasks
    .filter((t) => t.status === "completed" && t.approved)
    .reduce((sum, t) => sum + (t.priority || 0), 0);

  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const approvalRate = completedTasks > 0 ? (approvedTasks / completedTasks) * 100 : 0;
  const performanceScore = totalPriority > 0 ? (earnedPriority / totalPriority) * 100 : 0;

  return (
    <Card style={{ marginBottom: 20, borderRadius: 12 }}>
      <Title level={4} style={{ marginBottom: 16 }}>Performance Overview</Title>
      
      <Row gutter={[16, 16]}>
        {/* Completion Rate */}
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="Completion Rate"
              value={completionRate.toFixed(1)}
              suffix="%"
              prefix={<CheckOutlined />}
              valueStyle={{ color: green }}
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
              valueStyle={{ color: primaryColor }}
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
                  title="Completed"
                  value={completedTasks}
                  suffix={`/ ${totalTasks}`}
                  valueStyle={{ color: green, fontSize: 20 }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Approved"
                  value={approvedTasks}
                  suffix={`/ ${completedTasks}`}
                  valueStyle={{ color: primaryColor, fontSize: 20 }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Additional Stats */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} sm={8}>
          <Card size="small">
            <Text type="secondary">Pending Tasks</Text>
            <Title level={3} style={{ margin: 0, color: "#faad14" }}>
              {pendingTasks}
            </Title>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card size="small">
            <Text type="secondary">In Progress</Text>
            <Title level={3} style={{ margin: 0, color: "#1890ff" }}>
              {inProgressTasks}
            </Title>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card size="small">
            <Text type="secondary">Earned / Total Priority</Text>
            <Title level={3} style={{ margin: 0, fontSize: 20 }}>
              {earnedPriority} / {totalPriority}
            </Title>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default PerformanceTasksPerMember;