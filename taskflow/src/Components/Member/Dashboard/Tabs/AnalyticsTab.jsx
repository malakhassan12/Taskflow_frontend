import React from "react";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const statusData = [
  { name: "To Do", value: 1, color: "#6b7280" },
  { name: "In Progress", value: 1, color: "#3b82f6" },
  { name: "Done", value: 1, color: "#10b981" },
];

const priorityData = [
  { name: "High", value: 2, color: "#ef4444" },
  { name: "Medium", value: 1, color: "#f59e0b" },
  { name: "Low", value: 0, color: "#10b981" },
];

const trendData = [
  { month: "Jan", created: 2, completed: 1 },
  { month: "Feb", created: 2, completed: 1 },
  { month: "Mar", created: 2, completed: 2 },
  { month: "Apr", created: 3, completed: 1 },
];

const ChartCard = ({ title, subtitle, children }) => (
  <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
    <p className="text-xs text-slate-500">{subtitle}</p>
    <div className="mt-3 h-52">{children}</div>
  </article>
);

const AnalyticsTab = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ChartCard title="My Task Status Distribution" subtitle="Current status of your assigned tasks">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" outerRadius={62} label>
                {statusData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="My Task Priority Distribution" subtitle="Priority levels across your tasks">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={priorityData} dataKey="value" nameKey="name" outerRadius={62} label>
                {priorityData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-800">Monthly Task Trend</h3>
        <p className="text-xs text-slate-500">Your task created vs completed over time</p>
        <div className="mt-3 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="created" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </article>
    </div>
  );
};

export default AnalyticsTab;
