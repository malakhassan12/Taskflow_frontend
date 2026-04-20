import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import TaskModal from "../../Modals/TaskModal";

const EditTaskBtn = ({ task }) => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  console.log(task);
  return (
    <>
      <TaskModal
        isTaskModalOpen={isTaskModalOpen}
        setIsTaskModalOpen={setIsTaskModalOpen}
        task={task}
      />
      <Button
        icon={<EditOutlined />}
        size="small"
        onClick={setIsTaskModalOpen}
      />
    </>
  );
};

export default EditTaskBtn;
