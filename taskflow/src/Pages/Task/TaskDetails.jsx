import { useParams } from "react-router-dom";
import { Card, Descriptions, Tag, Space, Typography, Grid, Spin, Alert, Button, Modal, Avatar } from "antd";
import { CalendarOutlined, UserOutlined, FlagOutlined, DeleteOutlined } from "@ant-design/icons";
import BackBtn from "../../Components/Buttons/BackBtn";
import useGetTask from "../../Hooks/Task/useGetTask";
import DeleteTaskBtn from "../../Components/Buttons/Task/DeleteTaskBtn";

const { Title, Text } = Typography;

const TaskDetails = () => {
  const { taskId } = useParams();
  
  const { data: task, isLoading } = useGetTask(taskId);

  if (isLoading) return <Spin size="large" />;
  if (!task) return <Alert message="Task not found" type="error" />;

  const priorityColors = { 1: "green", 2: "blue", 3: "orange", 4: "red" };
  const statusColors = { todo: "default", "in-progress": "processing", pending: "warning", completed: "success" };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <BackBtn />
           <DeleteTaskBtn id={task?.id} />
          </div>

          <Title level={3}>{task.title}</Title>
          
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Description">
              {task.discription || "No description"}
            </Descriptions.Item>
            <Descriptions.Item label="Priority">
              <Tag color={priorityColors[task.priority]}>
                Priority {task.priority}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={statusColors[task.status]}>
                {task.status || "Todo"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Due Date">
              <CalendarOutlined /> {new Date(task.dueTime).toLocaleDateString()}
            </Descriptions.Item>
            <Descriptions.Item label="Assigned To">
              <Avatar icon={<UserOutlined />} />
              <Text style={{ marginLeft: 8 }}>
                {task.assignedMember?.firstName || "Unassigned"}
              </Text>
            </Descriptions.Item>
          </Descriptions>
        </Space>
      </Card>
    </div>
  );
};

export default TaskDetails;