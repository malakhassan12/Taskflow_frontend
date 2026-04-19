// ==================== React-router-dom ====================

import { Link, useParams } from "react-router-dom";

// ==================== Ant Design ====================

import {
  Flex,
  Tag,
  Typography,
  Form,
  Card,
  Button,
  Space,
  Skeleton,
} from "antd";
import {
  CalendarOutlined,
  DeleteOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

// ==================== Components ====================

import BackBtn from "../../Components/Buttons/BackBtn";
import TaskModal from "../../Components/Modals/TaskModal";
import DeleteProjectModal from "../../Components/Modals/DeleteProjectModal";
import ProjectTabs from "../../Components/Tabs/Project/ProjectTabs";
import PerformaceProject from "../../Components/Analytics/Project/PerformaceProject";
import useGetProject from "../../Hooks/Manager/useGetProject";
import TextSkelton from "../../Components/Skelton/TextSkelton";
import AddNewTaskBtn from "../../Components/Buttons/Task/AddNewTaskBtn";
import DeleteProjectBtn from "../../Components/Buttons/Project/DeleteProjectBtn";
import ProjectBox from "../../Components/Box/ProjectBox";

const { Title, Text } = Typography;

const ManageProject = () => {
  const { projectId } = useParams();

  const { data } = useGetProject(projectId);

  console.log(data);

  // Static project data (will be replaced with API data)
  // const data = {
  //   name: "TaskFlow Project",
  //   description:
  //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id magnam expedita hic dolorem doloremque! Atque minus ullam excepturi nam laborum.",
  //   deadline: "2024-12-31",
  //   members: 8,
  //   tasks: 24,
  // };

  return (
    <div style={{ minHeight: "100vh", paddingInline: 0 }}>
      {/* Modals */}
      {/* Header Section */}
      <Card style={{ marginBottom: "24px", borderRadius: "12px" }}>
        <Flex justify="space-between" align="start" wrap="wrap" gap="16px">
          <ProjectBox
            name={data?.name}
            description={data?.description}
            endDate={data?.endDate}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <AddNewTaskBtn projectId={projectId} />

            <DeleteProjectBtn projectId={projectId} />
          </div>
        </Flex>
      </Card>
      {/* Should API */}
      <PerformaceProject />
      {/* Tabs Section */}
      <Button
        type="primary"
        ghost
        icon={<UnorderedListOutlined />}
        style={{ borderRadius: "6px", marginBottom: "1rem" }}
      >
        <Link to="tasks">Show All Tasks</Link>
      </Button>{" "}
      <Card style={{ borderRadius: "12px", padding: "0 !important" }}>
        <ProjectTabs projectId={projectId} />
      </Card>
    </div>
  );
};

export default ManageProject;
