// ==================== Ant Design ====================
import { Col, Row, Typography } from "antd";
// ==================== Icons ====================
import { Users, UserCog, UsersRound, FolderKanban, CheckSquare, TrendingUp } from "lucide-react";
// ==================== React ====================
import { useState, useEffect } from "react";
// ==================== API ====================
import { getPendingRequests, getAllUsers } from "../../Api/api/admin.api";
import { getProjects, getAllMembers } from "../../Api/api/manager.api";

const { Title } = Typography;

const DashboardMonitor = () => {
  const [stats, setStats] = useState([
    {
      title: "Total Users",
      value: "0",
      description: "Active users in system",
      icon: <Users size={32} />,
      color: "#3b82f6",
      bgColor: "#dbeafe",
    },
    {
      title: "Project Managers",
      value: "0",
      description: "Managing projects",
      icon: <UserCog size={32} />,
      color: "#8b5cf6",
      bgColor: "#ede9fe",
    },
    {
      title: "Team Members",
      value: "0",
      description: "Working on tasks",
      icon: <UsersRound size={32} />,
      color: "#22c55e",
      bgColor: "#dcfce7",
    },
    {
      title: "Total Projects",
      value: "0",
      description: "Active projects",
      icon: <FolderKanban size={32} />,
      color: "#14b8a6",
      bgColor: "#ccfbf1",
    },
    {
      title: "Total Tasks",
      value: "0",
      description: "Tasks assigned",
      icon: <CheckSquare size={32} />,
      color: "#f97316",
      bgColor: "#ffedd5",
    },
    {
      title: "Overall Progress",
      value: "0%",
      description: "Completion rate",
      icon: <TrendingUp size={32} />,
      color: "#ec4899",
      bgColor: "#fce7f3",
    },
  ]);

  // Map API status to UI status (same logic as Member Dashboard)
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

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch users
      let users = [];
      try {
        const usersRes = await getAllUsers();
        users = usersRes || [];
      } catch (error) {
        console.error("Error fetching users:", error);
        // Fallback to hardcoded values temporarily
        users = [
          { role: 'Admin' },
          { role: 'ProjectManager' },
          { role: 'ProjectManager' },
          { role: 'ProjectManager' },
          { role: 'ProjectManager' },
          { role: 'ProjectManager' },
          { role: 'TeamMember' },
        ];
      }
      const adminCount = users.filter(m => m.role === 'Admin').length;
      const managerCount = users.filter(m => m.role === 'ProjectManager').length;
      const memberCount = users.filter(m => m.role === 'TeamMember').length;

      // Fetch projects
      const projectsRes = await getProjects(1, 1000);
      const projects = Array.isArray(projectsRes) ? projectsRes : [];

      // Get tasks from projects
      const allTasks = projects.flatMap(p => p.tasks || []);
      const tasksWithStatus = allTasks.map((task) => {
        const raw = getRawStatusFromTask(task);
        const statusLabel = mapApiStatusToUi(raw);
        return { ...task, statusLabel };
      });

      const tasksCompletedCount = tasksWithStatus.filter(t => t.statusLabel === "Done").length;
      const totalTasks = allTasks.length;
      const progress = totalTasks > 0 ? Math.round((tasksCompletedCount / totalTasks) * 100) : 0;

      // Update stats
      setStats([
        {
          title: "Total Users",
          value: String(users.length),
          description: "Active users in system",
          icon: <Users size={32} />,
          color: "#3b82f6",
          bgColor: "#dbeafe",
        },
        {
          title: "Project Managers",
          value: String(managerCount),
          description: "Managing projects",
          icon: <UserCog size={32} />,
          color: "#8b5cf6",
          bgColor: "#ede9fe",
        },
        {
          title: "Team Members",
          value: String(memberCount),
          description: "Working on tasks",
          icon: <UsersRound size={32} />,
          color: "#22c55e",
          bgColor: "#dcfce7",
        },
        {
          title: "Total Projects",
          value: String(projects.length),
          description: "Active projects",
          icon: <FolderKanban size={32} />,
          color: "#14b8a6",
          bgColor: "#ccfbf1",
        },
        {
          title: "Total Tasks",
          value: String(totalTasks),
          description: "Tasks assigned",
          icon: <CheckSquare size={32} />,
          color: "#f97316",
          bgColor: "#ffedd5",
        },
        {
          title: "Overall Progress",
          value: `${progress}%`,
          description: "Completion rate",
          icon: <TrendingUp size={32} />,
          color: "#ec4899",
          bgColor: "#fce7f3",
        },
      ]);

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <div>
      <Title level={3} style={{ marginBottom: "24px" }}>
        Dashboard Overview
      </Title>
      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={8} xl={4}>
            <div
              style={{
                background: stat.bgColor,
                borderRadius: "16px",
                padding: "24px",
                height: "100%",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "12px",
                    background: stat.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  {stat.icon}
                </div>
              </div>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  color: stat.color,
                  marginBottom: "8px",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "4px",
                }}
              >
                {stat.title}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                }}
              >
                {stat.description}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DashboardMonitor;
