import React, { useMemo, useState } from "react";
import AnalyticsTab from "./Tabs/AnalyticsTab";
import DashboardTabs from "./DashboardTabs";
import OverdueAlert from "./OverdueAlert";
import StatCard from "./StatCard";
import MyProjectsTab from "./Tabs/MyProjectsTab";
import MyTasksTab from "./Tabs/MyTasksTab";
import { useTheme } from "../../../Context/DarkModeProvider";

const statsData = [
  { title: "Total Tasks", value: "3", subtitle: "33% completion", iconName: "tasks", colorTheme: "primary" },
  { title: "Completed", value: "1", subtitle: "Task finished", iconName: "completed", colorTheme: "green" },
  { title: "In Progress", value: "1", subtitle: "Active work", iconName: "inprogress", colorTheme: "orange" },
  { title: "To Do", value: "1", subtitle: "Pending tasks", iconName: "todo", colorTheme: "purple" },
  { title: "Overdue", value: "2", subtitle: "Needs attention", iconName: "overdue", colorTheme: "red" },
];

const tabs = [
  { id: "tasks", label: "My Tasks" },
  { id: "projects", label: "My Projects" },
  { id: "analytics", label: "Analytics" },
];

const MemberDashboardContent = () => {
  const [activeTab, setActiveTab] = useState("tasks");
  const { isDarkMode } = useTheme();

  const overdueCount = useMemo(() => statsData.find((item) => item.title === "Overdue")?.value || 0, []);

  return (
    <section className="space-y-6">
      <div>
        <h2 className={`text-3xl font-bold tracking-tight ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>My Dashboard</h2>
        <p className={`mt-1 text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
          Track your assigned tasks, project progress, and performance analytics.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {statsData.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <OverdueAlert overdueCount={overdueCount} />

      <DashboardTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "tasks" && <MyTasksTab />}
      {activeTab === "projects" && <MyProjectsTab />}
      {activeTab === "analytics" && <AnalyticsTab />}
    </section>
  );
};

export default MemberDashboardContent;
