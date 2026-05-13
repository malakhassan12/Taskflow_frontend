import { 
  Space, 
  Avatar, 
  Typography, 
  Tag, 
  Button,
  Tooltip
} from 'antd';
import {
  MailOutlined,
  TeamOutlined,
  ProjectOutlined,
  FileTextOutlined,
  BellOutlined,
  EyeOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

const MemberColumns = (handleViewDetails) => [
  {
    title: "Member",
    key: "member",
    width: 250,
    render: (_, record) => (
      <Space size={12}>
        <Avatar 
          size={40} 
          style={{ backgroundColor: "#1677ff" }}
        >
          {record.name?.charAt(0).toUpperCase() || "U"}
        </Avatar>
        <div>
          <Text strong style={{ fontSize: 14 }}>
            {record.name}
          </Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            ID: {record.id?.slice(0, 8)}...
          </Text>
        </div>
      </Space>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 220,
    render: (email) => (
      <Space>
        <MailOutlined style={{ color: "#1890ff" }} />
        <Text>{email}</Text>
      </Space>
    ),
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    width: 130,
    render: (role) => (
      <Tag 
        icon={<TeamOutlined />} 
        color="blue"
        style={{ borderRadius: "20px",  }}
      >
        {role}
      </Tag>
    ),
  },
  {
    title: "Projects",
    dataIndex: "projectsCount",
    key: "projects",
    width: 100,
    render: (count) => (
      <Tag icon={<ProjectOutlined />} color="cyan">
        {count} Projects
      </Tag>
    ),
    sorter: (a, b) => a.projectsCount - b.projectsCount,
  },
  {
    title: "Tasks",
    dataIndex: "tasksCount",
    key: "tasks",
    width: 100,
    render: (count) => (
      <Tag icon={<FileTextOutlined />} color="purple">
        {count} Tasks
      </Tag>
    ),
    sorter: (a, b) => a.tasksCount - b.tasksCount,
  },
  {
    title: "Notifications",
    dataIndex: "notificationsCount",
    key: "notifications",
    width: 120,
    render: (count) => (
      <Tag icon={<BellOutlined />} color="orange">
        {count} Notifications
      </Tag>
    ),
    sorter: (a, b) => a.notificationsCount - b.notificationsCount,
  },
  {
    title: "Actions",
    key: "actions",
    width: 100,
    fixed: "right",
    render: (_, record) => (
      <Tooltip title="View Member Details">
        <Button
          type="primary"
          ghost
          icon={<EyeOutlined />}
          size="small"
          onClick={() => handleViewDetails(record)}
          style={{ borderRadius: "6px" }}
        >
          View
        </Button>
      </Tooltip>
    ),
  },
];

export default MemberColumns;