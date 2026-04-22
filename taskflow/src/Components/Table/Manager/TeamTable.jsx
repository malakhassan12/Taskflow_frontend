import { useState } from "react";

// ==================== Ant Design ====================
import {
  Table,
  Card,
  Input,
  Typography,
  Avatar,
  Button,
  Space,
  Tag,
  Spin,
  Empty,
  Tooltip,
} from "antd";
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
import teamColumns from "../Columns/TeamColumns";
import DataLoad from "../../Loaders/DataLoad";
import DataError from "../../Error/DataError";
// ==================== Hooks ====================

import useGetTeams from "../../../Hooks/Manager/useGetTeams.js";
// ==================== Context ====================

import MemberModal from "../../Modals/Admin/MemberModal.jsx";
import useSearch from "../../../Context/SearchContext.js";
import SearchBar from "../../Search/SearchBar.jsx";

const { Title, Text } = Typography;
const { Search } = Input;

const TeamTable = () => {
  const [openTasksModal, setOpenTasksModal] = useState(false);
  const [openMemberModal, setOpenMemberModal] = useState(false);

  const [projectId, setProjectId] = useState(null);
  const [memberId, setMemberId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const { data: teamsData, isLoading, error } = useGetTeams();

  // Transform API data to table format
  const transformedData =
    teamsData?.map((item, index) => ({
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

 

  const { _, setSearchTerm, filteredData } = useSearch(
    transformedData,
    ["name", "project_name"],
  );

  const handleViewTasks = (record) => {
    // Extract project ID from project_code (e.g., "PRJ-4" -> 4)
    const extractedProjectId = record.project_id?.split("-")[1];
    setProjectId(extractedProjectId);
    setMemberId(record.teamMemberId);
    setSelectedMember(record);
    setOpenTasksModal(true);
  };

  const handleViewMember = (record) => {
    setSelectedMember(record);

    setOpenMemberModal(true);
  };

  if (isLoading) {
    return <DataLoad item="teams" />;
  }

  if (error) {
    return <DataError item="teams" />;
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

      <MemberModal
        viewModalOpen={openMemberModal}
        setViewModalOpen={setOpenMemberModal}
        selectedMember={selectedMember}
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

      <Card
        style={{ borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
      >
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

          <SearchBar
            onSearch={setSearchTerm}
            placeholder="Search member or project..."
          />
        </div>

        <Table
          columns={teamColumns(handleViewTasks, handleViewMember)}
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
