import React, { useState } from "react";
import {
  Typography,
  Row,
  Col,
  Grid,
  Space,
  Divider,
  Card,
  Statistic,
  Button,
  Empty,
  Spin,
  Tag,
  Input,
  Select,
  Badge,
} from "antd";
import {
  UnorderedListOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  ClockCircleOutlined,
  PlusOutlined,
  CalendarOutlined,
  SearchOutlined,
  FilterOutlined,
} from "@ant-design/icons";

// ==================== Components ====================
import BackBtn from "../../Components/Buttons/BackBtn";
import TaskCard from "../../Components/Cards/TaskCard";
import TaskModal from "../../Components/Modals/TaskModal";
import { useParams } from "react-router-dom";
import useGetTasksPerProject from "../../Hooks/Manager/useGetTasksPerProject";
import DataLoad from "../../Components/Loaders/DataLoad";

const { Title, Text } = Typography;
const { Search } = Input;
const { useBreakpoint } = Grid;

const Tasks = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const { projectId } = useParams();
  
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const { data: projectData, isLoading, refetch } = useGetTasksPerProject(projectId);
  
  const tasks = projectData?.tasks || [];
  
  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title?.toLowerCase().includes(searchText.toLowerCase()) ||
                         task.discription?.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  const stats = [
    {
      title: "Total",
      value: tasks.length,
      icon: <UnorderedListOutlined />,
      color: "#1890ff",
      status: "all",
    },
    {
      title: "Completed",
      value: tasks.filter((t) => t.status === "completed").length,
      icon: <CheckCircleOutlined />,
      color: "#52c41a",
      status: "completed",
    },
    {
      title: "In Progress",
      value: tasks.filter((t) => t.status === "in-progress").length,
      icon: <SyncOutlined spin />,
      color: "#faad14",
      status: "in-progress",
    },
    {
      title: "Pending",
      value: tasks.filter((t) => t.status === "pending" || !t.status).length,
      icon: <ClockCircleOutlined />,
      color: "#ff4d4f",
      status: "pending",
    },
  ];
  
  if (isLoading) {
    return (
     <DataLoad/>
    );
  }
  
  return (
    <div style={{ padding: isMobile ? "16px" : "24px", minHeight: "100vh",  }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Header */}
        <Card style={{ marginBottom: 24, borderRadius: 12 }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={12}>
              <Space direction="vertical" size={8}>
                <BackBtn />
                <Title level={isMobile ? 3 : 2} style={{ margin: 0 }}>
                  {projectData?.name || "Project Tasks"}
                </Title>
                {projectData?.description && (
                  <Text type="secondary">{projectData.description}</Text>
                )}
              </Space>
            </Col>
            <Col xs={24} md={12} style={{ textAlign: "right" }}>
              <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsTaskModalOpen(true)} size="large">
                New Task
              </Button>
            </Col>
          </Row>
        </Card>
        
        {/* Stats */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          {stats.map((stat) => (
            <Col xs={12} sm={12} md={6} key={stat.title}>
              <Card
                hoverable
                onClick={() => setStatusFilter(stat.status)}
                style={{
                  borderRadius: 12,
                  cursor: "pointer",
                  border: statusFilter === stat.status ? `2px solid ${stat.color}` : "none",
                }}
              >
                <Statistic
                  title={stat.title}
                  value={stat.value}
                  prefix={stat.icon}
                  valueStyle={{ color: stat.color }}
                />
              </Card>
            </Col>
          ))}
        </Row>
        
        {/* Filters */}
        <Card style={{ marginBottom: 24, borderRadius: 12 }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={16}>
              <Search
                placeholder="Search tasks..."
                allowClear
                enterButton={<SearchOutlined />}
                onSearch={setSearchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Col>
            <Col xs={24} md={8}>
              <Select
                style={{ width: "100%" }}
                placeholder="Filter by status"
                value={statusFilter}
                onChange={setStatusFilter}
                options={[
                  { label: "All Tasks", value: "all" },
                  { label: "Completed", value: "completed" },
                  { label: "In Progress", value: "in-progress" },
                  { label: "Pending", value: "pending" },
                ]}
              />
            </Col>
          </Row>
        </Card>
        
        {/* Tasks List */}
        {filteredTasks.length === 0 ? (
          <Card style={{ textAlign: "center", padding: 40, borderRadius: 12 }}>
            <Empty description="No tasks found">
              <Button type="primary" onClick={() => setIsTaskModalOpen(true)}>
                Create Task
              </Button>
            </Empty>
          </Card>
        ) : (
          <Row gutter={[16, 16]}>
            {filteredTasks.map((task) => (
              <Col xs={24} lg={12} xl={8} key={task.id}>
                <TaskCard 
                  task={task} 
                    
                />
              </Col>
            ))}
          </Row>
        )}
      </div>
      
      <TaskModal
        isTaskModalOpen={isTaskModalOpen}
        setIsTaskModalOpen={() => {
          setIsTaskModalOpen(false);
          setSelectedTask(null);
          refetch();
        }}
        task={selectedTask}
        projectId={projectId}
      />
    </div>
  );
};

export default Tasks;