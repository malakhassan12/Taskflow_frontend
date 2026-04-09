import { Button, Popconfirm, Tooltip } from "antd";
import {
  DeleteOutlined,
} from "@ant-design/icons";

const DeleteTaskBtn = ({ id }) => {
  // From API
  const handleDeleteTask = (taskId) => {
    // setTasks(tasks.filter((task) => task.id !== taskId));
    // messageApi.success("Task deleted successfully");
    console.log(taskId);
  };
  return (
    <Popconfirm
      title="Delete Task"
      description="Are you sure you want to delete this task?"
      onConfirm={() => handleDeleteTask(id)}
      okText="Yes"
      cancelText="No"
    >
      <Tooltip title="Delete">
        <Button icon={<DeleteOutlined />} size="small" danger />
      </Tooltip>
    </Popconfirm>
  );
};

export default DeleteTaskBtn;
