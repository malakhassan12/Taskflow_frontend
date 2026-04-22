// ==================== Ant Design ====================
import { Col, Row, Empty, Typography, Card, Progress, Space } from "antd";
import {
  FolderOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
// ==================== Constants ====================
import { taskStatus } from "../../../Constants/TaskConstants";
// ==================== Components ====================
import TasksCard from "../../Cards/TasksCard";
import useGetTasksPerProject from "../../../Hooks/Manager/useGetTasksPerProject";
import { useParams } from "react-router-dom";
import DataError from "../../Error/DataError";
import DataLoad from "../../Loaders/DataLoad";

const { Title, Text } = Typography;

const StatusTab = () => {
  const { projectId } = useParams();
  const {
    data: projectData,
    isLoading,
    error,
  } = useGetTasksPerProject(projectId);

  if (isLoading) return <DataLoad item="tasks" />;
  if (error) return <DataError item="tasks" />;

  const tasks = projectData?.tasks || [];
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (t) => t.status === "done" || t.status === "completed",
  ).length;
  const completionRate =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div>
      {/* Header with Progress */}
      <div style={{ marginBottom: 32 }}>
        <Space direction="vertical" size={8} style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <Title level={3} style={{ margin: 0 }}>
                Task Board
              </Title>
              <Text type="secondary">{totalTasks} tasks total</Text>
            </div>
            <div style={{ textAlign: "right" }}>
              <Text strong style={{ fontSize: 24, color: "#52c41a" }}>
                {completionRate}%
              </Text>
              <br />
              <Text type="secondary">Complete</Text>
            </div>
          </div>
          <Progress
            percent={completionRate}
            strokeColor="#52c41a"
            showInfo={false}
            size="small"
          />
        </Space>
      </div>

      {/* Task Columns */}
      {tasks.length === 0 ? (
        <DataError item="tasks" />
      ) : (
        <Row gutter={[24, 24]}>
          {taskStatus.map((statusItem) => (
            <Col xs={24} lg={12} key={statusItem}>
              <TasksCard status={statusItem} allTasks={tasks} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default StatusTab;
