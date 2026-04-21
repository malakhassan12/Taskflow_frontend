import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
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

const API_BASE = "http://taskflowproject1.runasp.net";
const STATUS_OVERRIDES_KEY = "taskflow_task_status_overrides";

const loadStatusOverrides = () => {
  try {
    const raw = sessionStorage.getItem(STATUS_OVERRIDES_KEY);
    if (!raw) {
      return {};
    }
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

const mapApiStatusToUi = (status) => {
  if (typeof status === "number") {
    if (status === 0) return "Todo";
    if (status === 1) return "In progress";
    if (status === 2) return "Done";
    if (status === 3) return "Done";
  }

  const s = String(status ?? "").trim().toLowerCase();
  if (s === "todo" || s === "to_do" || s === "to-do") return "Todo";
  if (s === "in_progress" || s === "inprogress" || s === "in progress") return "In progress";
  if (s === "done" || s === "completed" || s === "complete") return "Done";
  if (s === "approved") return "Todo";
  return "Todo";
};

const getRawStatusFromTask = (task) =>
  task?.status ?? task?.Status ?? task?.state ?? task?.State;

const ChartCard = ({ title, subtitle, children }) => (
  <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
    <p className="text-xs text-slate-500">{subtitle}</p>
    <div className="mt-3 h-52">{children}</div>
  </article>
);

const AnalyticsTab = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUserId = JSON.parse(localStorage.getItem("user"))?.userId;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE}/api/User/${currentUserId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data.tasks || []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUserId) {
      fetchTasks();
    }
  }, [currentUserId]);

  const { statusData, priorityData, trendData } = useMemo(() => {
    const overrides = loadStatusOverrides();

    const tasksWithStatus = tasks.map((task) => {
      const raw = getRawStatusFromTask(task);
      const idKey = String(task.id);
      const fallbackApiStatus = overrides[idKey];
      const effectiveRaw = raw != null && raw !== "" ? raw : fallbackApiStatus ?? raw;
      const statusLabel = mapApiStatusToUi(effectiveRaw);
      return { ...task, statusLabel };
    });

    // Status Distribution
    const statusCounts = {
      "To Do": tasksWithStatus.filter((t) => t.statusLabel === "Todo").length,
      "In Progress": tasksWithStatus.filter((t) => t.statusLabel === "In progress").length,
      "Done": tasksWithStatus.filter((t) => t.statusLabel === "Done").length,
    };

    const statusData = [
      { name: "To Do", value: statusCounts["To Do"], color: "#6b7280" },
      { name: "In Progress", value: statusCounts["In Progress"], color: "#3b82f6" },
      { name: "Done", value: statusCounts["Done"], color: "#10b981" },
    ];

    // Priority Distribution
    const priorityCounts = {
      "High": tasksWithStatus.filter((t) => t.priority === 3).length,
      "Medium": tasksWithStatus.filter((t) => t.priority === 2).length,
      "Low": tasksWithStatus.filter((t) => t.priority === 1 || t.priority === 0).length,
    };

    const priorityData = [
      { name: "High", value: priorityCounts["High"], color: "#ef4444" },
      { name: "Medium", value: priorityCounts["Medium"], color: "#f59e0b" },
      { name: "Low", value: priorityCounts["Low"], color: "#10b981" },
    ];

    // Monthly Trend (last 6 months)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const now = new Date();
    const trendData = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = months[date.getMonth()];
      const monthTasks = tasksWithStatus.filter((t) => {
        if (!t.dueTime) return false;
        const taskDate = new Date(t.dueTime);
        return taskDate.getMonth() === date.getMonth() && taskDate.getFullYear() === date.getFullYear();
      });

      const created = monthTasks.length;
      const completed = monthTasks.filter((t) => t.statusLabel === "Done").length;

      trendData.push({ month: monthName, created, completed });
    }

    return { statusData, priorityData, trendData };
  }, [tasks]);

  if (loading) {
    return <div className="text-center text-sm text-slate-500">Loading analytics...</div>;
  }

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
