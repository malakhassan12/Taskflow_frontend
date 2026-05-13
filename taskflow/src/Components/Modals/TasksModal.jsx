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
import CommentsModal from "./CommentsModal";
// ==================== Constants ====================
import AddNewTaskBtn from "../Buttons/Task/AddNewTaskBtn.jsx";
import DownloadTaskBtn from "../Buttons/Task/DownloadTaskBtn.jsx";
import DeleteTaskBtn from "../Buttons/Task/DeleteTaskBtn.jsx";
import EditTaskBtn from "../Buttons/Task/EditTaskBtn.jsx";
import useGetTasksPerMemberAndProject from "../../Hooks/Task/useGetTasksPerMemberAndProject.js";
import PerformanceTasksPerMember from "../Analytics/Task/PerformanceTasksPerMember";
import TasksTable from "../Table/Task/TasksTable.jsx";

const TasksModal = ({ modalOpen, setModalOpen, memberId, projectId }) => {
  // Get tasks from API
  console.log(memberId, projectId)
  const { data: tasks = [], isLoading } = useGetTasksPerMemberAndProject(
    memberId,
    projectId,
  );

  console.log(tasks);

  return (
    <>
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={1000}
        title="Tasks Management"
      >
        {/* Will Send the Member ID To take the performace */}
        <PerformanceTasksPerMember tasks={tasks} projectId={projectId} />

        {/* Add Button */}
        <div style={{ marginBottom: 16, textAlign: "right" }}>
          <AddNewTaskBtn projectId={projectId} />
        </div>

        <TasksTable
          tasks={tasks || []}
          memberId={memberId}
          isLoading={isLoading}
        />
      </Modal>
    </>
  );
};

export default TasksModal;
