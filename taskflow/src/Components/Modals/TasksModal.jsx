// ==================== Ant Design ====================
import { useState } from "react";
import {
  Modal,
  Table,
  Button,
  Space,
  Tag,
  Tooltip,
  Card,
  Row,
  Col,
  Statistic,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  CommentOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
// ==================== Components ====================
import TaskModal from "./TaskModal";
import CommentsModal from "./CommentsModal";
// ==================== Constants ====================
import AddNewTaskBtn from "../Buttons/Task/AddNewTaskBtn.jsx";
import DownloadTaskBtn from "../Buttons/Task/DownloadTaskBtn.jsx";
import DeleteTaskBtn from "../Buttons/Task/DeleteTaskBtn.jsx";
import EditTaskBtn from "../Buttons/Task/EditTaskBtn.jsx";
import useGetTasksPerMemberAndProject from "../../Hooks/Task/useGetTasksPerMemberAndProject.js";
import PerformanceTasksPerMember from "../Analytics/Task/PerformanceTasksPerMember";
const TasksModal = ({ modalOpen, setModalOpen, memberId, projectId }) => {
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [taskId, setTaskId] = useState(null);

  // Get tasks from API
  const { data: tasks = [], isLoading } = useGetTasksPerMemberAndProject(
    memberId,
    projectId,
  );

  console.log(tasks);

  const columns = [
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
      title: "Actions",
      key: "actions",
      width: 180,
      render: (_, record) => (
        <Space size="small">
          <EditTaskBtn task={record} />
          <DeleteTaskBtn id={record?.id} />
          <DownloadTaskBtn />
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

  return (
    <>
      <CommentsModal
        open={isCommentsModalOpen}
        setOpen={setIsCommentsModalOpen}
        taskId={taskId}
        memberId={memberId}
      />

      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={1000}
        title="Tasks Management"
      >
        {/* Will Send the Member ID To take the performace */}
        <PerformanceTasksPerMember Tasks={tasks} />

        {/* Add Button */}
        <div style={{ marginBottom: 16, textAlign: "right" }}>
          <AddNewTaskBtn projectId={projectId} />
        </div>

        {/* Tasks Table */}
        <Table
          columns={columns}
          dataSource={tasks}
          rowKey="id"
          loading={isLoading}
          pagination={{ pageSize: 5 }}
          scroll={{ x: 800 }}
        />
      </Modal>
    </>
  );
};

export default TasksModal;
