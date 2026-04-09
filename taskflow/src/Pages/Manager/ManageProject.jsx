import { useState } from "react";

// ==================== Ant Design ====================

import {
  Flex,
  message,
  Tag,
  Typography,
  Form,
  Card,
  Button,
  Space,
} from "antd";
import dayjs from "dayjs";
import {
  CalendarOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";

// ==================== Components ====================

import BackBtn from "../../Components/Buttons/BackBtn";
import TaskModal from "../../Components/Modals/TaskModal";
import DeleteProjectModal from "../../Components/Modals/DeleteProjectModal";
import ProjectTabs from "../../Components/Tabs/Project/ProjectTabs";
import { useParams } from "react-router-dom";
import PerformaceProject from "../../Components/Analytics/Project/PerformaceProject";

const { Title, Text } = Typography;

const ManageProject = () => {
  const { projectId } = useParams();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  // Static project data (will be replaced with API data)
  const projectData = {
    name: "TaskFlow Project",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id magnam expedita hic dolorem doloremque! Atque minus ullam excepturi nam laborum.",
    deadline: "2024-12-31",
    members: 8,
    tasks: 24,
  };

  const handleSaveTask = () => {
    form.validateFields().then((values) => {
      const newTask = {
        id: Date.now(),
        title: values.title,
        description: values.description,
        status: "pending",
        approved: false,
        createdAt: dayjs().format("YYYY-MM-DD"),
        dueDate: values.dueDate.format("YYYY-MM-DD"),
        completedAt: null,
        priority: values.priority,
      };
      console.log(newTask);
      messageApi.success("Task added successfully");
      setIsTaskModalOpen(false);
      form.resetFields();
    });
  };

  const handleAddTask = () => {
    form.resetFields();
    setIsTaskModalOpen(true);
  };

  return (
    <div style={{ minHeight: "100vh", paddingInline: 0 }}>
      {contextHolder}

      {/* Modals */}
      <TaskModal
        isTaskModalOpen={isTaskModalOpen}
        setIsTaskModalOpen={setIsTaskModalOpen}
        task={{}}
        handleSaveTask={handleSaveTask}
        form={form}
      />

      <DeleteProjectModal
        open={isDeleteModalOpen}
        setOpen={setIsDeleteModalOpen}
        projectName="TaskFlow Pro"
        onConfirm={() => {
          // Handle project deletion
          console.log("Project deleted");
        }}
      />

      {/* Header Section */}
      <Card style={{ marginBottom: "24px", borderRadius: "12px" }}>
        <Flex justify="space-between" align="start" wrap="wrap" gap="16px">
          <Space orientation="vertical" size="8px">
            <BackBtn />
            <Title level={2} style={{ margin: "16px 0 8px 0" }}>
              {projectData.name}
            </Title>
            <Text
              type="secondary"
              style={{ maxWidth: "600px", display: "block" }}
            >
              {projectData.description}
            </Text>
            <Tag
              icon={<CalendarOutlined />}
              color="blue"
              style={{ marginTop: "8px" }}
            >
              Deadline: {projectData.deadline}
            </Tag>
          </Space>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddTask}
              size="large"
              style={{ borderRadius: "8px", fontWeight: "600" }}
            >
              Add New Task
            </Button>

            <Button
              danger
              type="text" // Less aggressive than a solid red button
              icon={<DeleteOutlined />}
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete Project
            </Button>
          </div>
        </Flex>
      </Card>

      <PerformaceProject />
      {/* Tabs Section */}
      <Card style={{ borderRadius: "12px", padding: "0 !important" }}>
        <ProjectTabs projectId={projectId} />
      </Card>
    </div>
  );
};

export default ManageProject;
