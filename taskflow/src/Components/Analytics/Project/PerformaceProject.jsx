import { Col, Row, Card, Statistic, Spin, Empty, Progress } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  PlayCircleOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import useGetTaskStatusPerProject from "../../../Hooks/Manager/useGetTaskStatusPerProject";
import DataLoad from "../../Loaders/DataLoad";

const PerformaceProject = ({ projectId }) => {
  const { data = {}, isLoading } = useGetTaskStatusPerProject(projectId);

  const totalTasks = data?.totalTasks || 0;
  const toDoTasks = data?.toDo || 0;
  const inProgressTasks = data?.inProgress || 0;
  const completedTasks = data?.done || 0;
  const overallProgress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  if (isLoading) {
    return <DataLoad />;
  }

  return (
    <div style={{ marginBottom: "24px" }}>
      <Row gutter={[16, 16]}>
        {/* Overall Progress Card with Progress Bar */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            hoverable
            style={{
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              height: "100%",
            }}
          >
            <Statistic
              title="Overall Progress"
              value={overallProgress}
              prefix={<RocketOutlined />}
              suffix="%"
              styles={{
                content: {
                  color: "#1890ff",
                  fontSize: "24px",
                  fontWeight: "bold",
                },
              }}
            />
            <Progress
              percent={overallProgress}
              size="small"
              strokeColor="#1890ff"
              style={{ marginTop: 12 }}
              showInfo={false}
            />
          </Card>
        </Col>

        {/* To Do */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            hoverable
            style={{
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              height: "100%",
            }}
          >
            <Statistic
              title="To Do"
              value={toDoTasks}
              prefix={<ClockCircleOutlined />}
              suffix=" tasks"
              styles={{
                content: {
                  color: "#faad14",
                  fontSize: "24px",
                  fontWeight: "bold",
                },
              }}
            />
          </Card>
        </Col>

        {/* In Progress */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            hoverable
            style={{
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              height: "100%",
            }}
          >
            <Statistic
              title="In Progress"
              value={inProgressTasks}
              prefix={<PlayCircleOutlined />}
              suffix=" tasks"
              styles={{
                content: {
                  color: "#13c2c2",
                  fontSize: "24px",
                  fontWeight: "bold",
                },
              }}
            />
          </Card>
        </Col>

        {/* Completed */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            hoverable
            style={{
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              height: "100%",
            }}
          >
            <Statistic
              title="Completed"
              value={completedTasks}
              prefix={<CheckCircleOutlined />}
              suffix=" tasks"
              styles={{
                content: {
                  color: "#52c41a",
                  fontSize: "24px",
                  fontWeight: "bold",
                },
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PerformaceProject;
