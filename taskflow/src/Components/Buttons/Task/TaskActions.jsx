import React from "react";
import { Space, Divider, Tooltip, Badge } from "antd";
import { 
  UserAddOutlined, 
  EditOutlined, 
  DeleteOutlined,
  ThunderboltOutlined
} from "@ant-design/icons";
import AssignTaskBtn from "./AssignTaskBtn";
import DeleteTaskBtn from "./DeleteTaskBtn";
import EditTaskBtn from "./EditTaskBtn";

const TaskActions = ({ task, }) => {
  const isAssigned = task?.assignedMemberId !== null;

  return (
    <Space.Compact 
      block 
      size="middle"
      style={{ 
        display: "flex",
        justifyContent: "flex-end"
      }}
    >
      {/* Assign Button with Badge */}
      <Tooltip 
        title={isAssigned ? "Re-assign task" : "Assign task"}
        placement="top"
      >
        <Badge 
          dot={!isAssigned} 
          color="#52c41a"
          offset={[-5, 5]}
        >
          <AssignTaskBtn 
            task={task} 
          />
        </Badge>
      </Tooltip>

      {/* Edit Button */}
      <Tooltip title="Edit task" placement="top">
        <EditTaskBtn task={task} />
      </Tooltip>

      {/* Delete Button */}
      <Tooltip title="Delete task" placement="top">
        <DeleteTaskBtn id={task?.id} />
      </Tooltip>
    </Space.Compact>
  );
};

export default TaskActions;