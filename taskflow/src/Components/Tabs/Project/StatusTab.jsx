// ==================== Ant Design ====================
import { Col, Row, Spin, Empty } from "antd";
// ==================== Constants ====================
import { taskStatus } from "../../../Constants/TaskConstants";
// ==================== Components ====================
import TasksCard from "../../Cards/TasksCard";
import useGetTasksPerProject from "../../../Hooks/Manager/useGetTasksPerProject";
import { useParams } from "react-router-dom";

const StatusTab = () => {
  const { projectId } = useParams();
  const { data: projectData, isLoading, error } = useGetTasksPerProject(projectId);
  
  console.log(projectData)
  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
        <Spin size="large" tip="Loading tasks..." />
      </div>
    );
  }

  if (error) {
    return (
      <Empty 
        description="Failed to load tasks" 
        style={{ padding: "40px" }}
      />
    );
  }

  const tasks = projectData?.tasks || [];

  return (
    <div>
      <Row gutter={[16, 16]}>
        {taskStatus.map((statusItem, i) => (
          <Col xs={24} xl={12} key={i}>
            <TasksCard 
              status={statusItem} 
              allTasks={tasks || []} // Pass all tasks to filter
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default StatusTab;