import { Row, Col } from "antd";
import {
  FaFolder,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaTasks,
  FaUsers,
} from "react-icons/fa";
import GeneralCard from "./GeneralCard";
import useGetStatisticsForManager from "../../Hooks/Manager/useGetStatisticsForManager";
import CardSkeleton from "../Skelton/CardSkelton";

const ManagerCards = () => {
  const { data = {}, isLoading } = useGetStatisticsForManager();

  const err = "Not Respond";
  const stats = {
    totalProjects: data?.totalProjects || err,
    totalTasks: data?.totalTasks || err,
    totalUsers: data?.totalUsers || err,
    pendingProjects: data?.pendingProjects || err,
    toDoTasks: data?.taskStatusDistribution?.toDo || err,
    inProgressTasks: data?.taskStatusDistribution?.inProgress || err,
    doneTasks: data?.taskStatusDistribution?.done || err,
  };

  const activeProjects = stats.totalProjects - stats.pendingProjects;
  const taskCompletionRate =
    stats.totalTasks > 0 ? (stats.doneTasks / stats.totalTasks) * 100 : err;

  const cards = [
    {
      title: "Total Projects",
      icon: <FaFolder />,
      value: stats.totalProjects,
      color: "#3b82f6",
      loading: isLoading,
    },
    {
      title: "Active Projects",
      icon: <FaClock />,
      value: activeProjects,
      color: "#22c55e",
      progress: stats.totalProjects
        ? (activeProjects / stats.totalProjects) * 100
        : 0,
      loading: isLoading,
    },
    {
      title: "Total Tasks",
      icon: <FaTasks />,
      value: stats.totalTasks,
      color: "#8b5cf6",
      loading: isLoading,
    },
    {
      title: "Completed Tasks",
      icon: <FaCheckCircle />,
      value: stats.doneTasks,
      color: "#22c55e",
      progress: taskCompletionRate,
      loading: isLoading,
    },
    {
      title: "Team Members",
      icon: <FaUsers />,
      value: stats.totalUsers,
      color: "#06b6d4",
      loading: isLoading,
    },
    {
      title: "Pending Projects",
      icon: <FaExclamationTriangle />,
      value: stats.pendingProjects,
      color: "#ef4444",
      progress: stats.totalProjects
        ? (stats.pendingProjects / stats.totalProjects) * 100
        : 0,
      loading: isLoading,
    },
  ];

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
      {cards.map((card, index) => (
        <Col xs={24} sm={12} lg={8} xl={6} key={index}>
          <div
            data-aos="fade-down"
            data-aos-delay={index * 100}
            style={{ height: "100%" }}
          >
            {isLoading ? <CardSkeleton /> : <GeneralCard {...card} />}
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default ManagerCards;
