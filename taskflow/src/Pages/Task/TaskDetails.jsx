// ==================== React-router-dom  ====================

import { useParams } from "react-router-dom";
// ==================== Abt Design  ====================

import { Card, Descriptions, Tag, Space, Typography, Grid } from "antd";

import { ExclamationCircleOutlined } from "@ant-design/icons";
// ==================== Components  ====================

import BackBtn from "../../Components/Buttons/BackBtn";
import DeleteTaskBtn from "../../Components/Buttons/Task/DeleteTaskBtn";
// ==================== Functions  ====================

import getStatusColor from "../../Functions/Tasks/GetStatusColor";

const { Title, Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;

const TaskDetails = () => {
  const { taskId } = useParams();
  const screens = useBreakpoint();

  // بنعتبره موبايل لو الشاشة أصغر من md (768px)
  const isMobile = !screens.md;

  // Static task data
  const TASKS = {
    1: {
      id: "1",
      name: "Complete Project Documentation",
      description:
        "Write comprehensive documentation including API references, setup guide, and user manual.",
      priority: "high",
      dueDate: "2024-12-15",
      status: "in-progress",
      assignedTo: "John Doe",
      progress: "initial",
    },
    2: {
      id: "2",
      name: "Fix Login Bug",
      description:
        "Resolve authentication issue users are experiencing when logging in with Google OAuth.",
      priority: "high",
      dueDate: "2024-12-10",
      status: "pending",
      assignedTo: "Jane Smith",
      progress: "initial",
    },
    3: {
      id: "3",
      name: "Update UI Components",
      description: "Modernize the dashboard UI with new component library.",
      priority: "medium",
      dueDate: "2024-12-20",
      status: "completed",
      assignedTo: "Mike Johnson",
      progress: "completed",
    },
    4: {
      id: "4",
      name: "Write Unit Tests",
      description: "Create comprehensive unit tests for all API endpoints.",
      priority: "low",
      dueDate: "2024-12-25",
      status: "pending",
      assignedTo: "Sarah Williams",
      progress: "initial",
    },
  };

  const task = TASKS[taskId] || TASKS["1"];
  const canDelete = task.status !== "completed" && task.progress === "initial";

  const priorityConfig = {
    high: { color: "red", text: "High" },
    medium: { color: "orange", text: "Medium" },
    low: { color: "green", text: "Low" },
  };

  return (
    <div
      style={{
        maxWidth: 1000,
        margin: "0 auto",
        padding: isMobile ? "12px" : "24px",
      }}
    >
      <Card bodyStyle={{ padding: isMobile ? "16px" : "24px" }}>
        {" "}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            marginBottom: 24,
            gap: isMobile ? "16px" : "0",
          }}
        >
          <Space size={isMobile ? "small" : "middle"}>
            <BackBtn />
            <Title level={isMobile ? 4 : 3} style={{ margin: 0 }}>
              Task Details
            </Title>
          </Space>

          <div style={{ alignSelf: isMobile ? "flex-end" : "auto" }}>
            <DeleteTaskBtn />
          </div>
        </div>
        <Descriptions
          bordered
          column={isMobile ? 1 : 2} 
          layout={isMobile ? "vertical" : "horizontal"} 
        >
          <Descriptions.Item label="Task Name" span={isMobile ? 1 : 2}>
            <strong>{task.name}</strong>
          </Descriptions.Item>

          <Descriptions.Item label="Description" span={isMobile ? 1 : 2}>
            <Paragraph style={{ margin: 0 }}>{task.description}</Paragraph>
          </Descriptions.Item>

          <Descriptions.Item label="Priority">
            <Tag color={priorityConfig[task.priority]?.color}>
              {priorityConfig[task.priority]?.text}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Status">
            <Tag icon={getStatusColor[task.status]?.icon}>
              {getStatusColor[task.status]?.status}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Due Date">
            <strong>{task.dueDate}</strong>
          </Descriptions.Item>

          <Descriptions.Item label="Assigned To">
            <strong>{task.assignedTo}</strong>
          </Descriptions.Item>

          <Descriptions.Item label="Progress Stage" span={isMobile ? 1 : 2}>
            <Tag color={task.progress === "initial" ? "blue" : "green"}>
              {task.progress === "initial"
                ? "Initial Stage"
                : task.progress === "in-progress"
                  ? "In Progress"
                  : "Completed"}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
        <div style={{ marginTop: 20 }}>
          {!canDelete ? (
            <div
              style={{
                padding: "12px 16px",
                background: "#fff2e8",
                border: "1px solid #ffbb96",
                borderRadius: 8,
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
              }}
            >
              <ExclamationCircleOutlined
                style={{ color: "#fa8c16", fontSize: 16, marginTop: 4 }}
              />
              <div>
                <Text strong style={{ color: "#d46b00", display: "block" }}>
                  Cannot delete this task
                </Text>
                <ul
                  style={{
                    margin: "4px 0 0 16px",
                    padding: 0,
                    color: "#d46b00",
                  }}
                >
                  <li>Status is NOT "Completed"</li>
                  <li>Progress is in "Initial Stage"</li>
                </ul>
              </div>
            </div>
          ) : (
            <div
              style={{
                padding: "12px 16px",
                background: "#f6ffed",
                border: "1px solid #b7eb8f",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <ExclamationCircleOutlined
                style={{ color: "#52c41a", fontSize: 16 }}
              />
              <Text style={{ color: "#389e0d" }} strong>
                ✓ This task can be deleted - It meets all criteria
              </Text>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default TaskDetails;
