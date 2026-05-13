import { Avatar, Button, Space, Tag, Tooltip, Typography } from "antd";
import { Link } from "react-router-dom";
import { CommentOutlined, EyeOutlined } from "@ant-design/icons";
import getTaskStatusColor from "../../../Utils/StatusOfTasks/getTaskStatusColor";
import getTaskStatusText from "../../../Utils/StatusOfTasks/getTaskStatusText";
import dayjs from "dayjs";
import DownloadTaskBtn from "../../Buttons/Task/DownloadTaskBtn";
import DeleteTaskBtn from "../../Buttons/Task/DeleteTaskBtn";
import EditTaskBtn from "../../Buttons/Task/EditTaskBtn";

// ==================== Ant Design ====================
import {
  Modal,
  Table,
  Card,
  Row,
  Col,
  Statistic,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
const { Text } = Typography;
const TasksColumns = (setIsCommentsModalOpen, setTaskId, ) => {
  return [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 200,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      width: 80,
      render: (priority) => {
        const color =
          priority >= 4 ? "red" : priority >= 2 ? "orange" : "green";
        return <Tag color={color}>{priority}</Tag>;
      },
    },
    {
      title: "Due Date",
      dataIndex: "dueTime",
      key: "dueTime",
      width: 120,
      render: (date) => (date ? dayjs(date).format("YYYY-MM-DD") : "-"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status, record) => {
        // Exist update here
        console.log(record);
        if (record.statusPorAp === "APPROVED") {
          return <Tag color="success">Approved ✓</Tag>;
        }
        if (record.statusPorAp === "REJECTED") {
          return <Tag color="error">Rejected ✗</Tag>;
        }
        if (record.statusPorAp === "PENDING" ) {
          return <Tag color="warning">Pending Approval</Tag>;
        }
        return (
          <Tag color={getTaskStatusColor(status)?.status || "default"}>
            {getTaskStatusText(status)}
          </Tag>
        );
      },
    },
  
    {
      title: "Actions",
      key: "actions",
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <EditTaskBtn task={record} />
          <DeleteTaskBtn id={record?.id} />
          <Tooltip title="Comments">
            <Button
              size="small"
              icon={<CommentOutlined />}
              onClick={() => {
                setIsCommentsModalOpen(true);
                setTaskId(record.id);
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];
};

export default TasksColumns;
