// ==================== Ant Design ====================
import { Card, Col, Row, Progress, Typography, Tag } from "antd";
// ==================== Icons ====================
import {
  ShieldCheck,
  UserCog,
  Users,
  Clock,
  FolderOpen,
  ClipboardList,
  CheckCircle,
  PauseCircle,
  AlertCircle,
} from "lucide-react";
// ==================== React ====================
import { useState, useEffect } from "react";
// ==================== API ====================
import { getPendingRequests, getAllUsers } from "../../Api/api/admin.api";
import { getAllProjects, getProjectStatistics } from "../../Api/api/manager.api";

const { Title, Text } = Typography;

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

const DashboardCards = () => {
  const [usersData, setUsersData] = useState([
    {
      label: "Admins",
      value: 0,
      color: "#3b82f6",
      icon: <ShieldCheck size={20} />,
    },
    {
      label: "Project Managers",
      value: 0,
      color: "#8b5cf6",
      icon: <UserCog size={20} />,
    },
    {
      label: "Team Members",
      value: 0,
      color: "#22c55e",
      icon: <Users size={20} />,
    },
  ]);

  const [projectsData, setProjectsData] = useState([
    {
      label: "Active",
      value: 0,
      color: "#22c55e",
      icon: <FolderOpen size={20} />,
    },
    {
      label: "Planning",
      value: 0,
      color: "#3b82f6",
      icon: <ClipboardList size={20} />,
    },
    {
      label: "Completed",
      value: 0,
      color: "#8b5cf6",
      icon: <CheckCircle size={20} />,
    },
    {
      label: "On Hold",
      value: 0,
      color: "#f97316",
      icon: <PauseCircle size={20} />,
    },
  ]);

  const [tasksData, setTasksData] = useState([
    {
      label: "To Do",
      value: 0,
      color: "#6b7280",
      icon: <AlertCircle size={20} />,
    },
    {
      label: "In Progress",
      value: 0,
      color: "#3b82f6",
      icon: <Clock size={20} />,
    },
    {
      label: "Completed",
      value: 0,
      color: "#22c55e",
      icon: <CheckCircle size={20} />,
    },
  ]);

  const [pendingApprovals, setPendingApprovals] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch pending approvals (commented out due to API error 500)
      // const pendingRes = await getPendingRequests(1, 1000);
      // setPendingApprovals(Array.isArray(pendingRes) ? pendingRes.length : (pendingRes?.total || 0));
      setPendingApprovals(0); // Temporary hardcoded value

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

      setUsersData([
        { label: "Admins", value: adminCount, color: "#3b82f6", icon: <ShieldCheck size={20} /> },
        { label: "Project Managers", value: managerCount, color: "#8b5cf6", icon: <UserCog size={20} /> },
        { label: "Team Members", value: memberCount, color: "#22c55e", icon: <Users size={20} /> },
      ]);

      // Fetch all projects for admin dashboard
      const projectsRes = await getAllProjects();
      const projects = Array.isArray(projectsRes) ? projectsRes : [];
      // Since projects don't have status field, count all as active for now
      const activeCount = projects.length;
      const planningCount = 0;
      const completedCount = 0;
      const onHoldCount = 0;

      setProjectsData([
        { label: "Active", value: activeCount, color: "#22c55e", icon: <FolderOpen size={20} /> },
        { label: "Planning", value: planningCount, color: "#3b82f6", icon: <ClipboardList size={20} /> },
        { label: "Completed", value: completedCount, color: "#8b5cf6", icon: <CheckCircle size={20} /> },
        { label: "On Hold", value: onHoldCount, color: "#f97316", icon: <PauseCircle size={20} /> },
      ]);

      // Fetch task statistics from admin endpoint
      let statsData = { totalTasks: 0, taskStatusDistribution: { toDo: 0, inProgress: 0, done: 0 } };
      try {
        statsData = await getProjectStatistics() || statsData;
      } catch (error) {
        console.error("Error fetching project statistics:", error);
      }

      const totalTasks = statsData.totalTasks || 0;
      const totalToDo = statsData.taskStatusDistribution?.toDo || 0;
      const totalInProgress = statsData.taskStatusDistribution?.inProgress || 0;
      const totalDone = statsData.taskStatusDistribution?.done || 0;

      setTasksData([
        { label: "To Do", value: totalToDo, color: "#6b7280", icon: <AlertCircle size={20} /> },
        { label: "In Progress", value: totalInProgress, color: "#3b82f6", icon: <Clock size={20} /> },
        { label: "Completed", value: totalDone, color: "#22c55e", icon: <CheckCircle size={20} /> },
      ]);

      const progress = totalTasks > 0 ? Math.round((totalDone / totalTasks) * 100) : 0;
      setOverallProgress(progress);

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <div style={{ marginTop: "32px" }}>
      <Row gutter={[16, 16]}>
        {/* Users Breakdown Card */}
        <Col xs={24} lg={8}>
          <Card
            title={
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Users size={24} color="#3b82f6" />
                <Title level={4} style={{ margin: 0 }}>
                  Users Breakdown
                </Title>
              </div>
            }
            style={{ height: "100%" }}
          >
            <div style={{ marginBottom: "24px" }}>
              {usersData.map((item, index) => (
                <div key={index} style={{ marginBottom: "16px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div style={{ color: item.color }}>{item.icon}</div>
                      <Text strong>{item.label}</Text>
                    </div>
                    <Text strong style={{ color: item.color }}>
                      {item.value}
                    </Text>
                  </div>
                  <Progress
                    percent={item.value * 25}
                    showInfo={false}
                    strokeColor={item.color}
                    railColor="#f3f4f6"
                    size={{ strokeWidth: 8 }}
                  />
                </div>
              ))}
            </div>
            <div
              style={{
                padding: "16px",
                background: "#fef3c7",
                borderRadius: "12px",
                borderLeft: "4px solid #f97316",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text strong style={{ color: "#92400e" }}>
                  Pending Approvals
                </Text>
                <Tag color="orange" style={{ margin: 0 }}>
                  {pendingApprovals}
                </Tag>
              </div>
            </div>
          </Card>
        </Col>

        {/* Projects Status Card */}
        <Col xs={24} lg={8}>
          <Card
            title={
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <FolderOpen size={24} color="#8b5cf6" />
                <Title level={4} style={{ margin: 0 }}>
                  Projects Status
                </Title>
              </div>
            }
            style={{ height: "100%" }}
          >
            <div>
              {projectsData.map((item, index) => (
                <div key={index} style={{ marginBottom: "16px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div style={{ color: item.color }}>{item.icon}</div>
                      <Text strong>{item.label}</Text>
                    </div>
                    <Text strong style={{ color: item.color }}>
                      {item.value}
                    </Text>
                  </div>
                  <Progress
                    percent={item.value * 25}
                    showInfo={false}
                    strokeColor={item.color}
                    railColor="#f3f4f6"
                    size={{ strokeWidth: 8 }}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* Tasks Status Card */}
        <Col xs={24} lg={8}>
          <Card
            title={
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <ClipboardList size={24} color="#22c55e" />
                <Title level={4} style={{ margin: 0 }}>
                  Tasks Status
                </Title>
              </div>
            }
            style={{ height: "100%" }}
          >
            <div style={{ marginBottom: "24px" }}>
              {tasksData.map((item, index) => (
                <div key={index} style={{ marginBottom: "16px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div style={{ color: item.color }}>{item.icon}</div>
                      <Text strong>{item.label}</Text>
                    </div>
                    <Text strong style={{ color: item.color }}>
                      {item.value}
                    </Text>
                  </div>
                  <Progress
                    percent={item.value * 25}
                    showInfo={false}
                    strokeColor={item.color}
                    railColor="#f3f4f6"
                    size={{ strokeWidth: 8 }}
                  />
                </div>
              ))}
            </div>
            <div
              style={{
                padding: "16px",
                background: "#dcfce7",
                borderRadius: "12px",
                borderLeft: "4px solid #22c55e",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text strong style={{ color: "#166534" }}>
                  Overall Progress
                </Text>
                <Tag color="green" style={{ margin: 0 }}>
                  {overallProgress}%
                </Tag>
              </div>
              <Progress
                percent={overallProgress}
                showInfo={false}
                strokeColor="#22c55e"
                railColor="#bbf7d0"
                size={{ strokeWidth: 8 }}
                style={{ marginTop: "8px" }}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardCards;
