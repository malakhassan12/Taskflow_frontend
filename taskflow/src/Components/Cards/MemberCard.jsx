import { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Flex,
  Progress,
  Typography,
  Grid,
  Tag,
  Tooltip,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import TasksModal from "../Modals/TasksModal";

const { useBreakpoint } = Grid;
const { Title, Text } = Typography;

// Random avatar images for variety
const avatarImages = [
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg",
  "https://randomuser.me/api/portraits/men/45.jpg",
  "https://randomuser.me/api/portraits/women/22.jpg",
];

const statBoxStyle = {
  flex: 1,
  padding: "12px 8px",
  borderRadius: "8px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  border: "1px solid #f0f0f0",
  transition: "all 0.3s ease",
  cursor: "pointer",
};

const MemberCard = ({ member, projectId }) => {
  const screens = useBreakpoint();
  const [openMemberModal, setOpenMemberModal] = useState(false);

  // Calculate stats from real data
  const totalTasks = member?.tasks?.length || 0;
  const completedTasks =
    member?.tasks?.filter((t) => t.status === "completed").length || 0;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Get random avatar image based on member id
  const avatarIndex = (member?.id?.length || 0) % avatarImages.length;
  const avatarUrl = avatarImages[avatarIndex];

  // Get role color
  const getRoleColor = (role) => {
    switch (role) {
      case "ProjectManager":
        return "blue";
      case "TeamMember":
        return "green";
      default:
        return "default";
    }
  };

  return (
    <>
      {openMemberModal && (
        <TasksModal
          modalOpen={openMemberModal}
          setModalOpen={setOpenMemberModal}
          memberId={member.id}
          projectId={projectId}
        />
      )}

      <Card
        hoverable
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "16px",
          border: "1px solid #f0f0f0",
          transition: "all 0.3s ease",
          cursor: "pointer",
        }}
        styles={{ body: { padding: screens.xs ? "16px" : "20px" } }}
        onClick={() => setOpenMemberModal(true)}
      >
        {/* Top Row: Avatar & Info */}
        <Flex
          justify="space-between"
          align={screens.xs ? "center" : "flex-start"}
          style={{ marginBottom: 20 }}
          wrap="wrap"
          gap="small"
        >
          <Flex
            gap="middle"
            align="center"
            style={{ flexWrap: "wrap", width: "100%" }}
            vertical={screens.xs ? "center" : "row"}
          >
            <Avatar
              size={screens.xs ? 44 : 54}
              src={avatarUrl}
              icon={<UserOutlined />}
              style={{ flexShrink: 0 }}
            />
            <div style={{ textAlign: screens.xs ? "center" : "left", flex: 1 }}>
              <Flex
                align="center"
                gap={8}
                wrap="wrap"
                justify={screens.xs ? "center" : "flex-start"}
              >
                <Title level={5} style={{ margin: 0 }}>
                  {member?.name || "Unknown Member"}
                </Title>
                <Tag color={getRoleColor(member?.role)} style={{ margin: 0 }}>
                  {member?.role || "Member"}
                </Tag>
              </Flex>
              {member?.email && (
                <Tooltip title={member.email}>
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    <MailOutlined /> {member.email}
                  </Text>
                </Tooltip>
              )}
            </div>
          </Flex>
        </Flex>

        {/* Stats Boxes Row */}
        <Flex
          gap="small"
          style={{
            marginBottom: 20,
            flexDirection: screens.xs ? "column" : "row",
          }}
          wrap="wrap"
        >
          <Tooltip title="Total Tasks Assigned">
            <div style={statBoxStyle}>
              <Title level={4} style={{ margin: 0, color: "#1890ff" }}>
                {totalTasks}
              </Title>
              <Text type="secondary" style={{ fontSize: "11px" }}>
                <ClockCircleOutlined /> Tasks
              </Text>
            </div>
          </Tooltip>

          <Tooltip title="Completed Tasks">
            <div style={statBoxStyle}>
              <Title level={4} style={{ margin: 0, color: "#52c41a" }}>
                {completedTasks}
              </Title>
              <Text type="secondary" style={{ fontSize: "11px" }}>
                <CheckCircleOutlined /> Done
              </Text>
            </div>
          </Tooltip>

          <Tooltip title="Completion Rate">
            <div style={statBoxStyle}>
              <Title level={4} style={{ margin: 0, color: "#faad14" }}>
                {completionRate}%
              </Title>
              <Text type="secondary" style={{ fontSize: "11px" }}>
                Rate
              </Text>
            </div>
          </Tooltip>
        </Flex>

        {/* Progress Section */}
        <div>
          <Flex
            justify="space-between"
            style={{ marginBottom: 8 }}
            wrap="wrap"
            gap="4px"
          >
            <Text
              type="secondary"
              style={{ fontSize: screens.xs ? "11px" : "12px" }}
            >
              Overall Progress
            </Text>
            <Text
              strong
              style={{
                fontSize: screens.xs ? "11px" : "12px",
                color: "#52c41a",
              }}
            >
              {completionRate}% Complete
            </Text>
          </Flex>
          <Progress
            percent={completionRate}
            showInfo={false}
            strokeColor="#52c41a"
            trailColor="#f0f0f0"
            size={screens.xs ? 6 : 8}
            strokeLinecap="round"
          />
        </div>

        {/* View Tasks Button */}
        <Button
          type="link"
          style={{ marginTop: 16, padding: 0 }}
          onClick={(e) => {
            e.stopPropagation();
            setOpenMemberModal(true);
          }}
        >
          View Member Tasks →
        </Button>
      </Card>
    </>
  );
};

export default MemberCard;
