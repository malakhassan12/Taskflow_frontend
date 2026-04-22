import { Avatar, Button, Space, Tag, Tooltip, Typography } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import { primaryColor } from "../../../Constants/Colors";
import getTaskStatusColor from "../../../Utils/StatusOfTasks/getTaskStatusColor";
import getTaskStatusText from "../../../Utils/StatusOfTasks/getTaskStatusText";

const { Text } = Typography;
const teamColumns = (handleViewTasks, handleViewMember) => {
  return [
    {
      title: "Project Code",
      dataIndex: "project_id",
      key: "project_id",
      width: 100,
      fixed: "left",
      render: (text) => (
        <Tag color="blue" style={{ fontWeight: 500 }}>
          {text}
        </Tag>
      ),
      sorter: (a, b) => a.project_id.localeCompare(b.project_id),
    },
    {
      title: "Project Name",
      dataIndex: "project_name",
      key: "project_name",
      width: 180,
      sorter: true,
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text}>
          <span style={{ fontWeight: 500 }}>{text}</span>
        </Tooltip>
      ),
    },
    {
      title: "Team Member",
      dataIndex: "name",
      key: "name",
      width: 200,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <Space>
          <Avatar size="small" style={{ backgroundColor: primaryColor }}>
            {text?.charAt(0)?.toUpperCase()}
          </Avatar>
          <Button onClick={() => handleViewMember(record)}>{text}</Button>
        </Space>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 130,
      render: (text) => (
        <Text type="secondary" style={{ fontSize: 13 }}>
          {text || "—"}
        </Text>
      ),
    },
    {
      title: "Tasks",
      dataIndex: "number_of_tasks",
      key: "number_of_tasks",
      width: 80,
      align: "center",
      sorter: (a, b) => a.number_of_tasks - b.number_of_tasks,
      render: (count) => (
        <Tag color={count > 10 ? "orange" : count > 5 ? "blue" : "green"}>
          {count} tasks
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      align: "center",
      render: (status) => {
        return (
          <Tag color={getTaskStatusColor(status)}>
            {getTaskStatusText(status)}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      key: "action",
      width: 140,
      fixed: window.innerWidth >= 768 ? "right" : false,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View Tasks">
            <Button
              type="link"
              icon={<EyeOutlined />}
              size="small"
              onClick={() => handleViewTasks(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];
};

export default teamColumns;
