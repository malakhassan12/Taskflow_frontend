import React from "react";
import { Card, Avatar, Tag, Typography, Flex, Badge } from "antd";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import dayjs from "dayjs";

const { Text } = Typography;

const TaskCard = ({ task }) => {
  const priority = { color: "#d9d9d9", label: "None" };

  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const lastName = pathSegments[pathSegments.length - 1];

  console.log(lastName);
  return (
    <Card
      size="small"
      style={{
        borderRadius: 12,
        marginBottom: 8,
        transition: "all 0.2s",
      }}
      hoverable
    >
      <Flex align="center" gap={8}>
        <Badge color={priority.color} />
        <Text strong style={{ flex: 1, fontSize: 13 }}>
          <Link to={lastName == "tasks" ? `${task.id}` : `tasks/${task.id}`}>
            {task.title}
          </Link>
        </Text>
        <Tag style={{ borderRadius: 12, fontSize: 10 }}>
          {task.status || "Todo"}
        </Tag>
      </Flex>

      <Flex justify="space-between" style={{ marginTop: 8 }}>
        <Flex align="center" gap={4}>
          <Avatar size={18} icon={<UserOutlined />} style={{ fontSize: 10 }} />
          <Text type="secondary" style={{ fontSize: 10 }}>
            {task.assignedMember?.firstName || "Unassigned"}
          </Text>
        </Flex>
        <Flex align="center" gap={4}>
          <CalendarOutlined style={{ fontSize: 10, color: "#999" }} />
          <Text type="secondary" style={{ fontSize: 10 }}>
            {dayjs(task.dueTime).format("MMM DD")}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default TaskCard;
