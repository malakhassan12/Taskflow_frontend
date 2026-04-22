import { Button, Space, Typography, Avatar, Badge, Tooltip, Tag } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
const ManagerProjectsColumns = (handleDeleteClick, navigate) => [
  {
    title: "Project ID",
    dataIndex: "id",
    key: "id",
    width: 100,
    render: (text) => <Tag color="blue">#{text}</Tag>,
  },
  {
    title: "Project Name",
    dataIndex: "name",
    key: "name",
    width: 150,
    sorter: true,
  },

  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
    width: 120,
    sorter: true,
    render: (text) => (
      <Tag color="blue">{dayjs(text).format("YYYY-MM-DD")}</Tag>
    ),
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    key: "endDate",
    width: 120,
    sorter: true,
    render: (text) => <Tag color="red">{dayjs(text).format("YYYY-MM-DD")}</Tag>,
  },
  {
    title: "Actions",
    key: "action",
    width: 150,
    fixed: window.innerWidth >= 768 ? "right" : false,
    render: (_, record) => (
      <Space size="small">
        <Button
          type="link"
          icon={<EyeOutlined />}
          size="small"
          onClick={() => navigate(`/manager/projects/${record.id}`)}
        >
          View details
        </Button>

        <Button
          type="link"
          icon={<DeleteOutlined />}
          size="small"
          danger
          onClick={() => handleDeleteClick(record)}
        />
      </Space>
    ),
  },
];

export default ManagerProjectsColumns;
