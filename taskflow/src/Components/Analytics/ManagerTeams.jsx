import { Typography, Card, Spin, Empty } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { purple } from "../../Constants/Colors";
import useGetStatisticsForManager from "../../Hooks/Manager/useGetStatisticsForManager";

import DataLoad from "../Loaders/DataLoad";
import DataError from "../Error/DataError";
const { Title, Text } = Typography;

const ManagerTeams = () => {
  const { data, isLoading } = useGetStatisticsForManager();

  const taskStatus = data?.taskStatusDistribution || {
    toDo: 0,
    inProgress: 0,
    done: 0,
  };

  const pieData = [
    { name: "Completed", value: taskStatus.done, color: "#22c55e" },
    { name: "In Progress", value: taskStatus.inProgress, color: "#818cf8" },
    { name: "To Do", value: taskStatus.toDo, color: "#e0e7ff" },
  ];

  const totalTasks = data?.totalTasks || "Not Respond";

  if (isLoading) {
    return <DataLoad />;
  }

  return (
    <Card style={{ borderRadius: "16px" }}>
      <Title level={3} style={{ marginBottom: "4px" }}>
        Task Distribution
      </Title>
      <Text type="secondary">Distribution of tasks by status</Text>

      {pieData[0].value ? (
        <div style={{ width: "100%", height: 350, marginTop: "20px" }}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} Tasks`, "Count"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <DataError />
      )}

      <div style={{ marginTop: "16px", textAlign: "center" }}>
        <Text strong style={{ color: purple, fontSize: "16px" }}>
          Total Tasks: {totalTasks}
        </Text>
      </div>
    </Card>
  );
};

export default ManagerTeams;
