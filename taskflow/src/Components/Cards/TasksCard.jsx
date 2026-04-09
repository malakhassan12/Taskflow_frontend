// ==================== Ant Design  ====================

import { Card, Typography, Space, Empty } from "antd";
// ==================== Components  ====================

import TaskCard from "./TaskCard";
// ==================== Constants  ====================

import { primaryColor } from "../../Constants/Colors";

const { Title, Text } = Typography;

const TasksCard = ({ status }) => {
  console.log(status);

  // Static data for tasks based on status
  const getTasksByStatus = () => {
    const allTasks = {
      completed: [
        {
          title: "Design Database Schema",
          desc: "Create and optimize database structure for the project",
          due_date: "2024-01-20",
          status: "completed",
          member: { name: "Malak", avatar: "M", role: "Developer" }
        },
        {
          title: "Create UI Components",
          desc: "Build reusable React components",
          due_date: "2024-01-25",
          status: "completed",
          member: { name: "Rawan", avatar: "R", role: "Designer" }
        }
      ],
      "in-progress": [
        {
          title: "Develop API Endpoints",
          desc: "Implement RESTful APIs for user management",
          due_date: "2024-01-28",
          status: "in-progress",
          member: { name: "Malak", avatar: "M", role: "Developer" }
        },
        {
          title: "Integration Testing",
          desc: "Test all API integrations",
          due_date: "2024-01-30",
          status: "in-progress",
          member: { name: "Ahmed", avatar: "A", role: "Tester" }
        },
        {
          title: "Frontend Optimization",
          desc: "Optimize loading speed and performance",
          due_date: "2024-02-01",
          status: "in-progress",
          member: { name: "Rawan", avatar: "R", role: "Developer" }
        }
      ],
      pending: [
        {
          title: "Write Documentation",
          desc: "Create API documentation for developers",
          due_date: "2024-02-05",
          status: "pending",
          member: { name: "Sara", avatar: "S", role: "Writer" }
        },
        {
          title: "Deploy to Production",
          desc: "Deploy the application to production server",
          due_date: "2024-02-10",
          status: "pending",
          member: { name: "Malak", avatar: "M", role: "DevOps" }
        }
      ]
    };

    return allTasks[status] || [];
  };

  const tasks = getTasksByStatus();
  const statusTitles = {
    completed: "Completed Tasks",
    "in-progress": "In Progress Tasks",
    pending: "Pending Tasks",
    rejected: "Rejected Tasks"
  };

  return (
    <Card 
      style={{ 
        borderRadius: "12px",
        marginBottom: "16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        height:"100%"
      }}
    >
      <div style={{ marginBottom: "20px", borderBottom: "1px solid #f0f0f0", paddingBottom: "12px" }}>
        <Space orientation="vertical" size={4}>
          <Title level={4} style={{ margin: 0, color: primaryColor }}>
            {statusTitles[status] || "Tasks"}
          </Title>
          <Text type="secondary">Total: {tasks.length} tasks</Text>
        </Space>
      </div>

      <div style={{ maxHeight: "500px", overflowY: "auto" }}>
        {tasks.length === 0 ? (
          <Empty 
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={`No ${status} tasks available`}
            style={{ padding: "40px 0" }}
          />
        ) : (
          <Space orientation="vertical" size="16px" style={{ width: "100%" }}>
            {tasks.map((item, i) => (
              <div key={i} className="mb-3">
                <TaskCard task={item} />
              </div>
            ))}
          </Space>
        )}
      </div>
    </Card>
  );
};

export default TasksCard;