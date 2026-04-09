// ==================== Ant Design  ====================
import { Typography, Card } from "antd";
// ==================== recharts  ====================

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
// ==================== Constants  ====================

import { purple } from "../../Constants/Colors";

const { Title, Text } = Typography;

const avgProgressData = [
  {
    status: "To Do",
    range: [0, 5], // Mostly 0, maybe some tiny prep work
    avg: 2,
  },
  {
    status: "In Progress",
    range: [10, 90], // Wide range of progress
    avg: 54, // The actual average
  },
  {
    status: "Completed",
    range: [100, 100], // Always 100
    avg: 100,
  },
];

const ManagerAVGTasks = () => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <p style={{ fontWeight: "bold", margin: 0 }}>{label}</p>
          <p style={{ color: purple, margin: 0 }}>
            Avg Progress: {payload[0].value}%
          </p>
          {payload[1] && (
            <p style={{ color: "#999", fontSize: "12px" }}>
              Range: {payload[1].value[0]}% - {payload[1].value[1]}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card style={{ borderRadius: "16px" }}>
      <Title level={3}>Average Task Progress</Title>
      <Text type="secondary">
        Progression mean vs. range across task statuses
      </Text>

      <div style={{ width: "100%", height: 350, marginTop: "20px" }}>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart
            data={avgProgressData}
            margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis dataKey="status" axisLine={false} tickLine={false} />
            <YAxis
              unit="%"
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" align="right" />

            <Area
              name="Progress Range"
              type="monotone"
              dataKey="range"
              fill="#e0e7ff"
              stroke="none"
              connectNulls
            />

            <Line
              name="Average Progress"
              type="monotone"
              dataKey="avg"
              stroke={purple}
              strokeWidth={3}
              dot={{ r: 6, fill: purple }}
              activeDot={{ r: 8 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ManagerAVGTasks;
