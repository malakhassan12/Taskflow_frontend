// ==================== Ant Design ====================
import { Card, Typography, Space, Empty, Badge, Progress } from "antd";
import {
  CheckCircleOutlined,
  SyncOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
// ==================== Components ====================
import TaskCard from "./TaskCard";
// ==================== Constants ====================
import { primaryColor } from "../../Constants/Colors";
// ==================== Functions ====================
import { taskStatus } from "../../Constants/TaskConstants";
import getTaskStatusIcon from "../../Utils/StatusOfTasks/getTaskStatusIcon";
import getTaskStatusText from "../../Utils/StatusOfTasks/getTaskStatusText";
import DataError from "../Error/DataError";

const { Title, Text } = Typography;

const TasksCard = ({ status, allTasks = [] }) => {
  // Filter tasks based on status

  console.log(allTasks);
  console.log(allTasks);
  const getTasksByStatus = () => {
    if (!allTasks.length) return [];

    const mappedStatus = taskStatus[status] || status;

    return allTasks.filter((task) => {
      // Handle different status field names
      const taskStatus = task.status || task.statusPorAp?.toLowerCase();
      return taskStatus === mappedStatus;
    });
  };

  const tasks = getTasksByStatus();

  // Calculate progress percentage
  const totalTasks = allTasks.length;
  const progressPercentage =
    totalTasks > 0 ? Math.round((tasks.length / totalTasks) * 100) : 0;

  return (
    <Card
      style={{
        borderRadius: "12px",
        marginBottom: "16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        height: "100%",
        transition: "all 0.3s ease",
      }}
      hoverable
    >
      {/* Header Section */}
      <div
        style={{
          marginBottom: "20px",
          borderBottom: "1px solid #f0f0f0",
          paddingBottom: "12px",
        }}
      >
        <Space orientation="vertical" size={8} style={{ width: "100%" }}>
          <Space size={12} align="center">
            {getTaskStatusIcon(status)}
            <Title level={4} style={{ margin: 0, color: primaryColor }}>
              {getTaskStatusText(status) || status || "Tasks"}
            </Title>
            <Badge
              count={tasks.length}
              style={{ backgroundColor: primaryColor }}
            />
          </Space>

          {/* Progress Bar */}
          {totalTasks > 0 && (
            <div>
              <Progress
                percent={progressPercentage}
                size="small"
                showInfo={false}
                strokeColor={primaryColor}
              />
              <Space
                style={{
                  marginTop: 4,
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  {tasks.length} of {totalTasks} tasks
                </Text>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  {progressPercentage}%
                </Text>
              </Space>
            </div>
          )}
        </Space>
      </div>

      {/* Tasks List Section */}
        <style>
              {`
          .no-color-scroll::-webkit-scrollbar {
            width: 8px;
          }
          .no-color-scroll::-webkit-scrollbar-track {
            background: transparent;
          }
          .no-color-scroll::-webkit-scrollbar-thumb {
            background: #d9d9d9; 
            border-radius: 10px;
          }
          .no-color-scroll::-webkit-scrollbar-thumb:hover {
            background: #bfbfbf;
          }
          /* For Firefox */
          .no-color-scroll {
            scrollbar-width: thin;
            scrollbar-color: #d9d9d9 transparent;
          }
        `}
            </style>
      <div
        style={{ maxHeight: "500px", overflowY: "auto", paddingRight: "4px" }}
                      className="no-color-scroll"

      >
        {tasks.length === 0 ? (
          <DataError />
        ) : (
          <>
          
            <Space
              orientation="vertical"
              size="16px"
              style={{ width: "100%" ,  }}
            >
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </Space>
          </>
        )}
      </div>
    </Card>
  );
};

export default TasksCard;
