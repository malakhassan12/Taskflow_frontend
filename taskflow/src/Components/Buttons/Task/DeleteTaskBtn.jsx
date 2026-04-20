import { Button, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import useTaskMutations from "../../../Hooks/Task/useTaskMutations";
// import { useNavigate } from "react-router-dom";

const DeleteTaskBtn = ({ id }) => {
  const { deleteTaskMutation } = useTaskMutations();

  // const navigate = useNavigate()
  // From API
  const handleDeleteTask = (id) => {
    console.log("Id from delete task", id)
    deleteTaskMutation.mutate(id);
    // navigate(-1)
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
