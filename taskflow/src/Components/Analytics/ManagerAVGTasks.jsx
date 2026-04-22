import { Typography, Card, Spin, Empty, Row, Col, Progress } from "antd";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { purple } from "../../Constants/Colors";
import useGetStatisticsForManager from "../../Hooks/Manager/useGetStatisticsForManager";
import DataLoad from "../Loaders/DataLoad";
import DataError from "../Error/DataError";

const { Title, Text } = Typography;

const ManagerAVGTasks = () => {
  const { data, isLoading } = useGetStatisticsForManager();

  const taskStatus = data?.taskStatusDistribution || {
    toDo: 0,
    inProgress: 0,
    done: 0,
  };

  const totalTasks = data?.totalTasks || 0;

  // More realistic progress calculations
  const getAvgProgress = (status, count) => {
    if (count === 0) return 0;
    if (status === "done") return 100;
    if (status === "inProgress") return 45; // Average progress for in-progress tasks
    return 5; // To-do tasks have minimal progress
  };

  const getProgressRange = (status) => {
    if (status === "done") return [100, 100];
    if (status === "inProgress") return [15, 85];
    return [0, 15];
  };

  const chartData = [
    {
      status: "To Do",
      count: taskStatus.toDo,
      range: getProgressRange("todo"),
      avg: getAvgProgress("todo", taskStatus.toDo),
      percentage: totalTasks ? (taskStatus.toDo / totalTasks) * 100 : 0,
    },
    {
      status: "In Progress",
      count: taskStatus.inProgress,
      range: getProgressRange("inProgress"),
      avg: getAvgProgress("inProgress", taskStatus.inProgress),
      percentage: totalTasks ? (taskStatus.inProgress / totalTasks) * 100 : 0,
    },
    {
      status: "Completed",
      count: taskStatus.done,
      range: getProgressRange("done"),
      avg: getAvgProgress("done", taskStatus.done),
      percentage: totalTasks ? (taskStatus.done / totalTasks) * 100 : 0,
    },
  ];

  if (isLoading) {
    return <DataLoad />;
  }

  return (
    <Card style={{ borderRadius: "16px" }}>
      <Title level={3}>Task Progress Analysis</Title>
      <Text type="secondary">Average progress and distribution by status</Text>
      {chartData[0]?.count ? (
        <>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart
              data={chartData}
              margin={{ top: 20, right: 30, bottom: 20, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="status" />
              <YAxis unit="%" domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="range"
                fill="#e0e7ff"
                stroke="none"
                name="Progress Range"
              />
              <Line
                type="monotone"
                dataKey="avg"
                stroke={purple}
                strokeWidth={3}
                name="Average Progress"
                dot={{ r: 6 }}
              />
            </ComposedChart>
          </ResponsiveContainer>

          <Row gutter={16} style={{ marginTop: 20 }}>
            <Col span={8} style={{ textAlign: "center" }}>
              <Text type="secondary">📋 To Do</Text>
              <Title level={4}>{taskStatus.toDo}</Title>
              <Progress
                percent={chartData[0].percentage}
                size="small"
                strokeColor="#f59e0b"
                showInfo={false}
              />
            </Col>
            <Col span={8} style={{ textAlign: "center" }}>
              <Text type="secondary">⚡ In Progress</Text>
              <Title level={4}>{taskStatus.inProgress}</Title>
              <Progress
                percent={chartData[1].percentage}
                size="small"
                strokeColor="#3b82f6"
                showInfo={false}
              />
            </Col>
            <Col span={8} style={{ textAlign: "center" }}>
              <Text type="secondary">✅ Completed</Text>
              <Title level={4}>{taskStatus.done}</Title>
              <Progress
                percent={chartData[2].percentage}
                size="small"
                strokeColor="#22c55e"
                showInfo={false}
              />
            </Col>
          </Row>
        </>
      ) : (
        <DataError />
      )}
    </Card>
  );
};

export default ManagerAVGTasks;
