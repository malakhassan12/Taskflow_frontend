import React from "react";
import {
  Card,
  Avatar,
  Space,
  Tag,
  Typography,
  Grid,
  Tooltip,
  Badge,
  Progress,
} from "antd";
import {
  ClockCircleOutlined,
  UserOutlined,
  ArrowRightOutlined,
  FlagOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import getStatusText from "../../Functions/Tasks/GetStatusText";
import getStatusColor from "../../Functions/Tasks/GetStatusColor";

const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

const TaskCard = ({ task }) => {
  const screens = useBreakpoint();
  const isXs = screens.xs && !screens.sm;
  const isMobile = !screens.md;

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 1:
        return { color: "#52c41a", text: "Low" };
      case 2:
        return { color: "#1890ff", text: "Medium" };
      case 3:
        return { color: "#faad14", text: "High" };
      case 4:
        return { color: "#ff4d4f", text: "Urgent" };
      default:
        return { color: "#d9d9d9", text: "None" };
    }
  };

  const priorityInfo = getPriorityColor(task.priority);
  const statusInfo = getStatusColor(task.status);
  const isOverdue =
    task.dueTime &&
    new Date(task.dueTime) < new Date() &&
    task.status !== "completed";

  return (
    <Card
      hoverable
      style={{
        borderRadius: "12px",
        transition: "all 0.3s ease",
        height: "100%",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
      styles={{
        body: { padding: isMobile ? "14px" : "18px" },
      }}
    >
      {/* Status Bar at top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: statusInfo.color,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          height: "100%",
        }}
      >
        {/* Row 1: Title & Status Tag */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "8px",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Badge
              color={priorityInfo.color}
              text={!isXs && priorityInfo.text}
              style={{ fontSize: "11px" }}
            />
            <Title
              level={5}
              style={{
                margin: 0,
                fontSize: isXs ? "14px" : "16px",
                lineHeight: 1.4,
                flex: 1,
              }}
              ellipsis={{ rows: 2 }}
            >
              <Link to={`${task?.id}`}>{task.title || "Untitled Task"}</Link>
            </Title>
          </div>

          <Tag
            color={statusInfo.color}
            style={{
              margin: 0,
              fontSize: "11px",
              borderRadius: "4px",
              padding: "2px 8px",
              fontWeight: 500,
            }}
          >
            {getStatusText(task.status) || task.statusPorAp || "Todo"}
          </Tag>
        </div>

        {/* Row 2: Description */}
        {task.discription && (
          <div>
            <Text
              type="secondary"
              style={{
                fontSize: isMobile ? "12px" : "13px",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                lineHeight: 1.5,
              }}
            >
              {task.discription}
            </Text>
          </div>
        )}

        {/* Row 3: Priority & Due Date */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          <Space size={8}>
            <FlagOutlined
              style={{ fontSize: "12px", color: priorityInfo.color }}
            />
            <Text
              style={{
                fontSize: "11px",
                color: priorityInfo.color,
                fontWeight: 500,
              }}
            >
              {priorityInfo.text} Priority
            </Text>
          </Space>

          <Space size={4}>
            <CalendarOutlined
              style={{
                fontSize: "11px",
                color: isOverdue ? "#ff4d4f" : "#8c8c8c",
              }}
            />
            <Text
              type="secondary"
              style={{
                fontSize: "11px",
                color: isOverdue ? "#ff4d4f" : undefined,
                fontWeight: isOverdue ? 500 : undefined,
              }}
            >
              {formatDate(task.dueTime)}
              {isOverdue && " (Overdue)"}
            </Text>
          </Space>
        </div>

        {/* Row 4: Assigned Member & Comments Count */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "auto",
            paddingTop: "8px",
            borderTop: "1px solid #f0f0f0",
          }}
        >
          <Tooltip
            title={`${task.assignedMember?.firstName || ""} ${task.assignedMember?.lastName || ""} - ${task.assignedMember?.role || "Unassigned"}`}
          >
            <Space size={8}>
              <Avatar
                size={28}
                style={{
                  backgroundColor: "#1890ff",
                  fontSize: "12px",
                }}
                icon={<UserOutlined />}
              >
                {task.assignedMember?.firstName?.charAt(0)}
                {task.assignedMember?.lastName?.charAt(0)}
              </Avatar>
              {!isXs && (
                <div>
                  <Text
                    style={{
                      fontSize: "12px",
                      display: "block",
                      lineHeight: 1.2,
                    }}
                  >
                    {task.assignedMember?.firstName || "Unassigned"}
                  </Text>
                  <Text type="secondary" style={{ fontSize: "10px" }}>
                    {task.assignedMember?.role || "Member"}
                  </Text>
                </div>
              )}
            </Space>
          </Tooltip>

          <Space size={8}>
            {task.comments && task.comments.length > 0 && (
              <Tag style={{ margin: 0, fontSize: "10px" }}>
                💬 {task.comments.length}
              </Tag>
            )}
            <Link
              to={`tasks/${task.id}`}
              onClick={(e) => e.stopPropagation()}
              style={{ fontSize: "11px", color: "#1890ff" }}
            >
              Details →
            </Link>
          </Space>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
