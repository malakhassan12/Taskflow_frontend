// ==================== Ant Design  ====================

import { Card, Progress, Tag, Avatar, Space, Typography } from "antd";
import {
  FaRegCheckSquare,
  FaUser,
  FaRegCalendarAlt,
} from "react-icons/fa";
// ==================== Constants  ====================

import { purple } from "../../Constants/Colors";

const { Title, Text, Paragraph } = Typography;

// From API

const ProjectCard = ({ project }) => {
  return (
    <Card
      hoverable
      style={{ height: "100%" }}
      styles={{ body: { padding: 24 } }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "8px",
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          {project.title}
        </Title>
        <Tag
          color="success"
          style={{
            borderRadius: "12px",
            border: "none",
            backgroundColor: "#f6ffed",
            color: "#52c41a",
            fontWeight: 500,
          }}
        >
          {project.status}
        </Tag>
      </div>

      {/* Description */}
      <Paragraph type="secondary" style={{ marginBottom: "24px" }}>
        {project.description}
      </Paragraph>

      {/* Progress Bar */}
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <Text strong type="secondary">
            Progress
          </Text>
          <Text strong>{project.progress}%</Text>
        </div>
        <Progress
          percent={project.progress}
          showInfo={false}
          strokeColor={purple}
          trail="#e0e7ff"
          size={{ strokeWidth: 20 }}
        />
      </div>

      {/* Tasks Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <Space>
          <FaRegCheckSquare style={{ color: "#8c8c8c" }} />
          <Text type="secondary">Tasks</Text>
        </Space>
        <Text strong>
          {project.tasksCompleted}/{project.totalTasks}
        </Text>
      </div>

      {/* Team Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Space>
          <FaUser style={{ color: "#8c8c8c" }} />
          <Text type="secondary">Team</Text>
        </Space>
        <Avatar.Group max={{ count: 2 }} size="medium">
          {project.team.map((member) => (
            <Avatar key={member.id} style={{ backgroundColor: member.color }}>
              {member.name}
            </Avatar>
          ))}
        </Avatar.Group>

      </div>

      {/* Due Date Section */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <FaRegCalendarAlt style={{ color: "#8c8c8c" }} />
        <Text type="secondary">Due {project.dueDate}</Text>
      </div>
    </Card>
  );
};

export default ProjectCard;
