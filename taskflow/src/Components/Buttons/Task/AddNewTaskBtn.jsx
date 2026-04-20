import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TaskModal from "../../Modals/TaskModal";
import { useState } from "react";

const AddNewTaskBtn = ({projectId}) => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  return (
    <>
      <TaskModal
        isTaskModalOpen={isTaskModalOpen}
        setIsTaskModalOpen={setIsTaskModalOpen}
        task={{}}
        projectId={projectId}
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={setIsTaskModalOpen}
        style={{ marginBottom: 16 }}
      >
        Add New Task
      </Button>
    </>
  );
};

export default AddNewTaskBtn;
