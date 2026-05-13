import React from "react";
import { Table, Tag, Space, Button, Typography, Card } from "antd";
import {
  UserAddOutlined,
  CalendarOutlined,
  FlagOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import AssignTaskBtn from "../../../Components/Buttons/Task/AssignTaskBtn";
import DeleteTaskBtn from "../../Buttons/Task/DeleteTaskBtn";
import EditTaskBtn from "../../Buttons/Task/EditTaskBtn";
import TaskActions from "../../Buttons/Task/TaskActions";

const { Text } = Typography;
const getPriorityTag = (priority) => {
  const config = {
    1: { color: "green", label: "Low" },
    2: { color: "orange", label: "Medium" },
    3: { color: "red", label: "High" },
  };
  const { color, label } = config[priority] || config[1];
  return <Tag color={color}>{label}</Tag>;
};

const unassignedTasksColumns = () => {
  return [
    {
      title: "Task Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Space orientation="vertical" size={0}>
          <Text strong>{text}</Text>
          {record.discription && record.discription !== "Not exist" && (
            <Text type="secondary" style={{ fontSize: 12 }}>
              {record.discription}
            </Text>
          )}
        </Space>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => getPriorityTag(priority),
      width: 100,
    },
    {
      title: "Due Date",
      dataIndex: "dueTime",
      key: "dueTime",
      render: (date) => (
        <Space>
          <CalendarOutlined />
          {date ? dayjs(date).format("MMM DD, YYYY") : "Not set"}
        </Space>
      ),
      width: 150,
    },
    {
      title: "Status",
      key: "status",
      render: () => (
        <Tag icon={<FlagOutlined />} color="warning">
          Unassigned
        </Tag>
      ),
      width: 120,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <TaskActions task={record} />
        </>
      ),
      width: 100,
    },
  ];
};

export default unassignedTasksColumns;
