import React, { useState } from "react";
import {
  Card,
  Input,
  Avatar,
  Button,
  Space,
  Typography,
  Tag,
  Flex,
  Empty,
  Form,
  Grid,
  Spin,
  Select,
} from "antd";
import {
  SearchOutlined,
  UserOutlined,
  CalendarOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { primaryColor } from "../../../Constants/Colors";
import DeleteTaskBtn from "../../Buttons/Task/DeleteTaskBtn";
import EditTaskBtn from "../../Buttons/Task/EditTaskBtn";
import TaskModal from "../../Modals/TaskModal";
import useGetTasksPerProject from "../../../Hooks/Manager/useGetTasksPerProject";
import { useParams } from "react-router-dom";
import AddNewTaskBtn from "../../Buttons/Task/AddNewTaskBtn";

const { Text } = Typography;
const { useBreakpoint } = Grid;

const TasksTab = () => {
  const { projectId } = useParams();
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const { data: projectData, isLoading } = useGetTasksPerProject(projectId);

  const [searchText, setSearchText] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");

  const tasks = projectData?.tasks || [];

  const getPriorityColor = (priority) => {
    const colors = { 1: "green", 2: "blue", 3: "orange", 4: "red" };
    return colors[priority] || "default";
  };

  const getPriorityText = (priority) => {
    const texts = { 1: "Low", 2: "Medium", 3: "High", 4: "Urgent" };
    return texts[priority] || "None";
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      ?.toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesPriority =
      filterPriority === "all" || task.priority === parseInt(filterPriority);
    return matchesSearch && matchesPriority;
  });

  if (isLoading) {
    return (
      <Flex justify="center" style={{ padding: 40 }}>
        <Spin />
      </Flex>
    );
  }

  return (
    <div style={{ padding: isMobile ? 8 : 4 }}>
      {/* Header */}
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Text strong>Tasks ({tasks.length})</Text>
        <AddNewTaskBtn projectId={projectId} />
      </Flex>

      {/* Search & Filter */}
      <Flex gap="small" style={{ marginBottom: 16 }} wrap>
        <Input
          placeholder="Search tasks..."
          prefix={<SearchOutlined />}
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: isMobile ? "100%" : 250 }}
        />
        <Select
          style={{ width: 120 }}
          value={filterPriority}
          onChange={setFilterPriority}
          options={[
            { label: "All", value: "all" },
            { label: "Urgent", value: "4" },
            { label: "High", value: "3" },
            { label: "Medium", value: "2" },
            { label: "Low", value: "1" },
          ]}
        />
      </Flex>

      {/* Task List */}
      <Flex vertical gap={12}>
        {filteredTasks.length === 0 ? (
          <Card>
            <Empty description="No tasks" />
          </Card>
        ) : (
          filteredTasks.map((task) => (
            <Card key={task.id} size="small" hoverable>
              <Flex justify="space-between" align="center" wrap="wrap" gap={12}>
                <Flex vertical gap={4} style={{ flex: 1 }}>
                  {/* Title & Status */}
                  <Flex align="center" gap={8} wrap="wrap">
                    <Text strong>{task.title}</Text>
                    <Tag color={getPriorityColor(task.priority)}>
                      {getPriorityText(task.priority)}
                    </Tag>
                    {task.dueTime && (
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        <CalendarOutlined />{" "}
                        {new Date(task.dueTime).toLocaleDateString()}
                      </Text>
                    )}
                  </Flex>

                  {/* Assignee */}
                  <Flex align="center" gap={8}>
                    <Avatar
                      size="small"
                      icon={<UserOutlined />}
                      style={{ backgroundColor: primaryColor }}
                    />
                    <Text style={{ fontSize: 13 }}>
                      {task.assignedMember?.firstName || "Unassigned"}
                    </Text>
                  </Flex>
                </Flex>

                {/* Actions */}
                <Space>
                  <EditTaskBtn task={task} />
                  <DeleteTaskBtn id={task.id} />
                </Space>
              </Flex>
            </Card>
          ))
        )}
      </Flex>
    </div>
  );
};

export default TasksTab;
