import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import AnalyticsTab from "./Tabs/AnalyticsTab";
import DashboardTabs from "./DashboardTabs";
import StatCard from "./StatCard";
import MyTasksTab from "./Tabs/MyTasksTab";
import { useTheme } from "../../../Context/DarkModeProvider";
import { getTasksStatus, getMyTasks } from "../../../Api/api/task.api";
import useGetTasksPerMemberAndProject from "../../../Hooks/Task/useGetTasksPerMemberAndProject";
import useGetMyTasks from "../../../Hooks/Task/useGetMyTasks";

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

const tabs = [
  { id: "tasks", label: "My Tasks" },
  { id: "analytics", label: "Analytics" },
];

const MemberDashboardContent = () => {
  const [activeTab, setActiveTab] = useState("tasks");
  const { isDarkMode } = useTheme();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taskStatuses, setTaskStatuses] = useState({});

  const currentUserId = JSON.parse(localStorage.getItem("user"))?.userId;
  const storedProjectId = JSON.parse(localStorage.getItem("user"))?.projectId;

  // Use React Query hook to fetch tasks
  // If projectId is available, use GetTasksForOneMember, otherwise use MyTasks
  const { data: tasksData = [], isLoading: tasksLoading } = storedProjectId
    ? useGetTasksPerMemberAndProject(currentUserId, storedProjectId)
    : useGetMyTasks(currentUserId);

  // Update tasks state when tasksData changes
  useEffect(() => {
    setTasks(tasksData);
    setLoading(tasksLoading);
  }, [tasksData, tasksLoading]);

  // Fetch status for each task when tasks change
  useEffect(() => {
    const fetchTaskStatuses = async () => {
      if (!tasks.length) return;

      const statusMap = {};
      const promises = tasks.map(async (task) => {
        try {
          // Use task's own projectID if available
          const taskProjectId = task.projectID || storedProjectId;
          if (!taskProjectId) return;

          const statusData = await getTasksStatus(task.id, taskProjectId);
          if (statusData && statusData.status && statusData.status.length > 0) {
            statusMap[task.id] = statusData.status[0];
          }
        } catch (error) {
          console.error(`Error fetching status for task ${task.id}:`, error);
        }
      });

      await Promise.all(promises);
      setTaskStatuses(statusMap);
    };

    fetchTaskStatuses();
  }, [tasks, storedProjectId]);

  const statsData = useMemo(() => {
    const overrides = loadStatusOverrides();

    const tasksWithStatus = tasks.map((task) => {
      // Use fetched status from GetTaskStatus endpoint, fallback to task.status, then overrides
      const fetchedStatus = taskStatuses[task.id];
      const raw = fetchedStatus ?? getRawStatusFromTask(task);
      const idKey = String(task.id);
      const fallbackApiStatus = overrides[idKey];
      const effectiveRaw = raw != null && raw !== "" ? raw : fallbackApiStatus ?? raw;
      const statusLabel = mapApiStatusToUi(effectiveRaw);
      return { ...task, statusLabel };
    });

    const total = tasksWithStatus.length;
    const completed = tasksWithStatus.filter((t) => t.statusLabel === "Done").length;
    const inProgress = tasksWithStatus.filter((t) => t.statusLabel === "In progress").length;
    const todo = tasksWithStatus.filter((t) => t.statusLabel === "Todo").length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return [
      { title: "Total Tasks", value: String(total), subtitle: `${completionRate}% completion`, iconName: "tasks", colorTheme: "primary" },
      { title: "Completed", value: String(completed), subtitle: "Task finished", iconName: "completed", colorTheme: "green" },
      { title: "In Progress", value: String(inProgress), subtitle: "Active work", iconName: "inprogress", colorTheme: "orange" },
      { title: "To Do", value: String(todo), subtitle: "Pending tasks", iconName: "todo", colorTheme: "purple" },
    ];
  }, [tasks, taskStatuses]);

  return (
    <section className="space-y-6">
      <div>
        <h2 className={`text-3xl font-bold tracking-tight ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>My Dashboard</h2>
        <p className={`mt-1 text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
          Track your assigned tasks, project progress, and performance analytics.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statsData.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <DashboardTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "tasks" && <MyTasksTab />}
      {activeTab === "analytics" && <AnalyticsTab />}
    </section>
  );
};

export default MemberDashboardContent;
