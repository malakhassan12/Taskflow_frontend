// ==================== Ant Design ====================
import { Card, Tag, Avatar, Space, Typography, Flex, Progress } from "antd";
import { FaRegCalendarAlt, FaUser, FaFolderOpen } from "react-icons/fa";
import dayjs from "dayjs";
// ==================== Constants ====================
import { purple } from "../../Constants/Colors";
import getTaskStatusColor from "../../Utils/StatusOfTasks/getTaskStatusColor";
import getTaskStatusText from "../../Utils/StatusOfTasks/getTaskStatusText";

const { Title, Text } = Typography;

const ProjectCard = ({ project }) => {
  // Format dates
  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    return dayjs(dateString).format("MMM DD, YYYY");
  };

  // Calculate days remaining
  const getDaysRemaining = (endDate) => {
    if (!endDate) return null;
    const days = dayjs(endDate).diff(dayjs(), "day");
    if (days < 0) return "Overdue";
    if (days === 0) return "Due today";
    return `${days} days left`;
  };

  

  const daysRemaining = getDaysRemaining(project.endDate);
  const totalTasks = project.tasks?.length || 0;
  const completedTasks =
    project.tasks?.filter((t) => t.status === "completed").length || 0;
  const progress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <Card
      hoverable
      style={{
        height: "100%",
        borderRadius: "12px",
        border: "1px solid #f0f0f0",
        transition: "all 0.3s ease",
      }}
      styles={{ body: { padding: "20px" } }}
    >
      {/* Header */}
      <Flex
        justify="space-between"
        align="flex-start"
        style={{ marginBottom: 12 }}
      >
        <Title
          level={4}
          style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}
        >
          {project.name}
        </Title>
        <Tag
          color={getTaskStatusColor(project?.status)}
          style={{ borderRadius: "12px", fontSize: "11px" }}
        >
          {getTaskStatusText(project?.status)}
        </Tag>
      </Flex>

      {/* Description */}
      {project.description && (
        <Text
          type="secondary"
          style={{ fontSize: "13px", display: "block", marginBottom: 16 }}
        >
          {project.discription}
        </Text>
      )}

      {/* Project Info */}
      <Flex vertical gap={12} style={{ marginBottom: 16 }}>
        {/* Project ID */}
        <Flex align="center" gap={8}>
          <FaFolderOpen style={{ color: "#8c8c8c", fontSize: "12px" }} />
          <Text type="secondary" style={{ fontSize: "12px" }}>
            Project ID: #{project.id}
          </Text>
        </Flex>

        {/* Manager */}
        <Flex align="center" gap={8}>
          <FaUser style={{ color: "#8c8c8c", fontSize: "12px" }} />
          <Text type="secondary" style={{ fontSize: "12px" }}>
            Manager: {project.manegerName || "Not assigned"}
          </Text>
        </Flex>

        {/* Dates */}
        <Flex align="center" gap={8}>
          <FaRegCalendarAlt style={{ color: "#8c8c8c", fontSize: "12px" }} />
          <Text type="secondary" style={{ fontSize: "12px" }}>
            {formatDate(project.startDate)} - {formatDate(project.endDate)}
          </Text>
        </Flex>
      </Flex>

      {/* Tasks Count */}
      <Flex justify="space-between" align="center" style={{ marginBottom: 8 }}>
        <Text type="secondary" style={{ fontSize: "12px" }}>
          Tasks
        </Text>
        <Text strong style={{ fontSize: "13px" }}>
          {completedTasks}/{totalTasks} completed
        </Text>
      </Flex>

      {/* Progress Bar */}
      <Progress
        percent={progress}
        showInfo={false}
        strokeColor={purple}
        railColor="#e0e7ff"
        size="small"
      />

      {/* Days Remaining */}
      {daysRemaining && (
        <div style={{ marginTop: 12 }}>
          <Tag
            color={daysRemaining === "Overdue" ? "error" : "blue"}
            style={{ fontSize: "11px", borderRadius: "12px" }}
          >
            {daysRemaining}
          </Tag>
        </div>
      )}
    </Card>
  );
};

export default ProjectCard;
