import { Button, Popconfirm, Tooltip } from "antd";
import { FiDelete } from "react-icons/fi";
import { useState } from "react";
import DeleteProjectModal from "../../Modals/DeleteProjectModal";

const DeleteProjectBtn = ({ projectId }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // From API
  return (
    <>
      <DeleteProjectModal
        open={isDeleteModalOpen}
        setOpen={setIsDeleteModalOpen}
        projectId={projectId}
      />
      <Button
        type="primary"
        danger
        icon={<FiDelete />}
        onClick={() => setIsDeleteModalOpen(true)}
        style={{ marginBottom: 16 }}
      >
        Delete The Project
      </Button>
    </>
  );
};

export default DeleteProjectBtn;
