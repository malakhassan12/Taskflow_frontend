import React, { useState } from "react";
import {
  Button,
  Tooltip,
  Modal,
  Select,
  Space,
  Typography,
  Avatar,
  Tag,
  Divider,
  Alert,
} from "antd";
import {
  UserAddOutlined,
  TeamOutlined,
  UserOutlined,
  CheckCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import AssignTaskModal from "../../Modals/Task/AssignTaskModal";

const { Option } = Select;
const { Text, Title } = Typography;

const AssignTaskBtn = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAssigned = task?.assignedMemberId !== null;

  return (
    <>
      <Tooltip title={isAssigned ? "Re-assign task" : "Assign task"}>
        <Button
          icon={<UserAddOutlined />}
          size="small"
          onClick={() => setIsModalOpen(true)}
          type={isAssigned ? "default" : "primary"}
          ghost={isAssigned}
          style={{
            color: isAssigned ? "#52c41a" : undefined,
            borderColor: isAssigned ? "#52c41a" : undefined,
          }}
        ></Button>
      </Tooltip>
      {isModalOpen && (
        <AssignTaskModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          task={task}
        />
      )}
    </>
  );
};

export default AssignTaskBtn;
