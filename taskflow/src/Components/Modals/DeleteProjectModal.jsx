// ==================== Ant Design ====================
import { Modal, Button, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
// ==================== Ant Design ====================

import { red } from "../../Constants/Colors";
import useManagerMutations from "../../Hooks/Manager/useManagerMutations";

const DeleteProjectModal = ({ open, setOpen, project }) => {
  const { deleteProjectMutation } = useManagerMutations();

  const deleteProject = () => {
    deleteProjectMutation.mutate(project?.id);
  };
  return (
    <Modal
      title="Delete Project"
      open={open}
      onCancel={() => {
        if (!deleteProjectMutation.isPending) {
          setOpen(false);
        }
      }}
      footer={null}
      centered
      width={400}
      closable={!deleteProjectMutation.isPending}
      maskClosable={!deleteProjectMutation.isPending}
    >
      <Space
        orientation="vertical"
        style={{ width: "100%", textAlign: "center" }}
      >
        <ExclamationCircleOutlined style={{ fontSize: 48, color: red }} />

        <h3>Are you sure?</h3>
        <p>Delete "{project?.name}" permanently?</p>

        <Space style={{ marginTop: 20 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            danger
            onClick={deleteProject}
            loading={deleteProjectMutation.isPending}
            disabled={deleteProjectMutation.isPending}
          >
            Delete
          </Button>
        </Space>
      </Space>
    </Modal>
  );
};

export default DeleteProjectModal;
