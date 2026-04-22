// ==================== Ant Design ====================
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
// ==================== Components ====================
import CommentsModal from "../../Modals/CommentsModal.jsx";
// ==================== Constants ====================
import AddNewTaskBtn from "../../Buttons/Task/AddNewTaskBtn.jsx";
import DownloadTaskBtn from "../../Buttons/Task/DownloadTaskBtn.jsx";
import DeleteTaskBtn from "../../Buttons/Task/DeleteTaskBtn.jsx";
import EditTaskBtn from "../../Buttons/Task/EditTaskBtn.jsx";
import PerformanceTasksPerMember from "../../Analytics/Task/PerformanceTasksPerMember";
import { useState } from "react";
import TasksColumns from "../Columns/TasksColumns.jsx";
import DataLoad from "../../Loaders/DataLoad.jsx";

const TasksTable = ({ tasks, memberId, isLoading }) => {
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [taskId, setTaskId] = useState(null);

  if (isLoading) return <DataLoad />;

  return (
    <div>
      <CommentsModal
        open={isCommentsModalOpen}
        setOpen={setIsCommentsModalOpen}
        taskId={taskId}
      />
      {/* Tasks Table */}
      <Table
        columns={TasksColumns(setIsCommentsModalOpen, setTaskId, memberId)}
        dataSource={tasks}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 800 }}
      />
    </div>
  );
};

export default TasksTable;
