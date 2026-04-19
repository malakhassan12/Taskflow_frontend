// ==================== Ant Design ====================
import { Card, Typography, Space, Empty, Badge, Progress } from "antd";
import { CheckCircleOutlined, SyncOutlined, ClockCircleOutlined } from "@ant-design/icons";
// ==================== Components ====================
import TaskCard from "./TaskCard";
// ==================== Constants ====================
import { primaryColor } from "../../Constants/Colors";
// ==================== Functions ====================
import getStatusText from "../../Functions/Tasks/GetStatusText";

const { Title, Text } = Typography;

const TasksCard = ({ status, allTasks = [] }) => {
  // Filter tasks based on status
  const getTasksByStatus = () => {
    if (!allTasks.length) return [];
    
    // Map status to actual task status values
    const statusMap = {
      "completed": "completed",
      "in-progress": "in-progress",
      "pending": "pending",
      "todo": "todo"
    };
    
    const mappedStatus = statusMap[status] || status;
    
    return allTasks.filter(task => {
      // Handle different status field names
      const taskStatus = task.status || task.statusPorAp?.toLowerCase();
      return taskStatus === mappedStatus;
    });
  };

  const tasks = getTasksByStatus();
  
  // Get status icon
  const getStatusIcon = () => {
    switch(status) {
      case "completed":
        return <CheckCircleOutlined style={{ color: "#52c41a" }} />;
      case "in-progress":
        return <SyncOutlined spin style={{ color: "#1890ff" }} />;
      case "pending":
        return <ClockCircleOutlined style={{ color: "#faad14" }} />;
      default:
        return null;
    }
  };

  // Calculate progress percentage
  const totalTasks = allTasks.length;
  const progressPercentage = totalTasks > 0 
    ? Math.round((tasks.length / totalTasks) * 100) 
    : 0;

  return (
    <Card 
      style={{ 
        borderRadius: "12px",
        marginBottom: "16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        height: "100%",
        transition: "all 0.3s ease"
      }}
      hoverable
    >
      {/* Header Section */}
      <div style={{ 
        marginBottom: "20px", 
        borderBottom: "1px solid #f0f0f0", 
        paddingBottom: "12px" 
      }}>
        <Space direction="vertical" size={8} style={{ width: "100%" }}>
          <Space size={12} align="center">
            {getStatusIcon()}
            <Title level={4} style={{ margin: 0, color: primaryColor }}>
              {getStatusText(status) || status || "Tasks"}
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
              <Space style={{ marginTop: 4, width: "100%", justifyContent: "space-between" }}>
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
      <div style={{ maxHeight: "500px", overflowY: "auto", paddingRight: "4px" }}>
        {tasks.length === 0 ? (
          <Empty 
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={`No ${getStatusText(status) || status} tasks`}
            style={{ padding: "40px 0" }}
          >
            <Text type="secondary" style={{ fontSize: "12px" }}>
              Tasks will appear here when assigned
            </Text>
          </Empty>
        ) : (
          <Space direction="vertical" size="16px" style={{ width: "100%" }}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </Space>
        )}
      </div>
    </Card>
  );
};

export default TasksCard;