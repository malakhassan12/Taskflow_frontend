import React from "react";
import { Table, Tag, Space, Button, Typography, Card } from "antd";
import {
  UserAddOutlined,
  CalendarOutlined,
  FlagOutlined,
} from "@ant-design/icons";
import useGetTasksPerProject from "../../../Hooks/Manager/useGetTasksPerProject";
import { useParams } from "react-router-dom";
import AssignTaskBtn from "../../../Components/Buttons/Task/AssignTaskBtn";
import DeleteTaskBtn from "../../Buttons/Task/DeleteTaskBtn";
import EditTaskBtn from "../../Buttons/Task/EditTaskBtn";
import TaskActions from "../../Buttons/Task/TaskActions";
import UnassignedTable from "../../Table/Manager/UnassignedTable";

const { Text } = Typography;

const UnassignedTasksTab = () => {
  const { projectId } = useParams();
  const { data: projectData, isLoading: tasksLoading } =
    useGetTasksPerProject(projectId);

  const allTasks = projectData?.tasks || [];
  const unassignedTasks = allTasks?.filter(
    (task) => task.assignedMemberId === null,
  );

  return (
    <Card
      title={
        <Space>
          <span>Unassigned Tasks</span>
          <Tag color="warning">
            {unassignedTasks.length} tasks need assignment
          </Tag>
        </Space>
      }
      style={{ borderRadius: 12 }}
    >
      <UnassignedTable unassignedTasks={unassignedTasks} tasksLoading={tasksLoading} />
    </Card>
  );
};

export default UnassignedTasksTab;
