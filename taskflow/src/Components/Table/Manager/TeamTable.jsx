import { useState } from "react";

// ==================== Ant Design ====================
import { Table, Card, Input, Typography, Avatar, Button, Space, Tag, Spin, Empty, Tooltip } from "antd";
import { primaryColor } from "../../../Constants/Colors";
import {
  EyeOutlined,
  DeleteOutlined,
  CommentOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";

// ==================== React-router-dom ====================
import { Link } from "react-router-dom";

// ==================== Components ====================
import TasksModal from "../../Modals/TasksModal";
import CommentsModal from "../../Modals/CommentsModal";
import DeleteMemberModal from "../../Modals/Manager/DeleteMemeberModal";
import useGetTeams from "../../../Hooks/Manager/useGetTeams.js";
import { useAuth } from "../../../Context/AuthContext.jsx";

const { Title , Text } = Typography;
const { Search } = Input;

const TeamTable = () => {
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [openTasksModal, setOpenTasksModal] = useState(false);
  const [projectId, setProjectId] = useState(null);
  const [memberId, setMemberId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const { data: teamsData, isLoading, error } = useGetTeams(user?.id);

  // Transform API data to table format
  const transformedData = teamsData?.map((item, index) => ({
    key: item.teamMemberId || index,
    project_id: item.projectCode,
    project_name: item.projectName,
    name: item.teamMemberName,
    teamMemberId: item.teamMemberId,
    phone: item.phone || "Not provided",
    number_of_tasks: item.tasksCount,
    completed_tasks: item.completedTasks || 0,
    tags: item.tags || ["team-member"],
    status: item.status || "active",
  })) || [];

  // Filter data based on search
  const filteredData = transformedData.filter((item) =>
    item.name?.toLowerCase().includes(searchText.toLowerCase()) ||
    item.project_name?.toLowerCase().includes(searchText.toLowerCase()) ||
    item.project_id?.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleViewTasks = (record) => {
    // Extract project ID from project_code (e.g., "PRJ-4" -> 4)
    const extractedProjectId = record.project_id?.split('-')[1];
    setProjectId(extractedProjectId);
    setMemberId(record.teamMemberId);
    setSelectedMember(record);
    setOpenTasksModal(true);
  };

  

  const columns = [
    {
      title: "Project Code",
      dataIndex: "project_id",
      key: "project_id",
      width: 100,
      fixed: "left",
      render: (text) => (
        <Tag color="blue" style={{ fontWeight: 500 }}>
          {text}
        </Tag>
      ),
      sorter: (a, b) => a.project_id.localeCompare(b.project_id),
    },
    {
      title: "Project Name",
      dataIndex: "project_name",
      key: "project_name",
      width: 180,
      sorter: true,
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text}>
          <span style={{ fontWeight: 500 }}>{text}</span>
        </Tooltip>
      ),
    },
    {
      title: "Team Member",
      dataIndex: "name",
      key: "name",
      width: 200,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <Space>
          <Avatar size="small" style={{ backgroundColor: primaryColor }}>
            {text?.charAt(0)?.toUpperCase()}
          </Avatar>
          <Link to={`/manager/members/${record.teamMemberId}`}>
            {text}
          </Link>
        </Space>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 130,
      render: (text) => (
        <Text type="secondary" style={{ fontSize: 13 }}>
          {text || "—"}
        </Text>
      ),
    },
    {
      title: "Tasks",
      dataIndex: "number_of_tasks",
      key: "number_of_tasks",
      width: 80,
      align: "center",
      sorter: (a, b) => a.number_of_tasks - b.number_of_tasks,
      render: (count) => (
        <Tag color={count > 10 ? "orange" : count > 5 ? "blue" : "green"}>
          {count} tasks
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      align: "center",
      render: (status) => {
        const statusConfig = {
          active: { color: "green", text: "Active" },
          "in-progress": { color: "blue", text: "In Progress" },
          completed: { color: "success", text: "Completed" },
          pending: { color: "warning", text: "Pending" },
        };
        const config = statusConfig[status] || { color: "default", text: status };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "action",
      width: 140,
      fixed: window.innerWidth >= 768 ? "right" : false,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View Tasks">
            <Button
              type="link"
              icon={<EyeOutlined />}
              size="small"
              onClick={() => handleViewTasks(record)}
            />
          </Tooltip>
         
        
        </Space>
      ),
    },
  ];

  if (isLoading) {
    return (
      <Card style={{ borderRadius: "12px", textAlign: "center", padding: 40 }}>
        <Spin size="large" tip="Loading team data..." />
      </Card>
    );
  }

  if (error) {
    return (
      <Card style={{ borderRadius: "12px", textAlign: "center", padding: 40 }}>
        <Empty description="Failed to load team data" />
      </Card>
    );
  }

  return (
    <div>
      <TasksModal
        modalOpen={openTasksModal}
        setModalOpen={setOpenTasksModal}
        memberId={memberId}
        projectId={projectId}
        memberName={selectedMember?.name}
        projectName={selectedMember?.project_name}
      />

      

      <DeleteMemberModal
        open={isDeleteModalOpen}
        setOpen={setIsDeleteModalOpen}
        memberName={selectedMember?.name}
        projectName={selectedMember?.project_name}
        onConfirm={() => {
          console.log("Member deleted:", selectedMember);
          // Add delete logic here
          setIsDeleteModalOpen(false);
        }}
      />

      <Card style={{ borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <Title level={4} style={{ margin: 0 }}>
              Team Projects
            </Title>
            <Text type="secondary">
              Total members: {transformedData.length}
            </Text>
          </div>
          
          <Search
            placeholder="Search by name or project..."
            prefix={<SearchOutlined />}
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 280 }}
            size="middle"
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          scroll={{ x: 1000 }}
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Total ${total} items`,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
          loading={isLoading}
          rowKey="key"
        />
      </Card>
    </div>
  );
};

export default TeamTable;