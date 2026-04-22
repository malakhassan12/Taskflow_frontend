import { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Flex,
  Typography,
  Grid,
  Tag,
  Tooltip,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
} from "@ant-design/icons";
import TasksModal from "../Modals/TasksModal";

const { useBreakpoint } = Grid;
const { Title, Text } = Typography;

const MemberCard = ({ member, projectId }) => {
  const screens = useBreakpoint();
  const [openMemberModal, setOpenMemberModal] = useState(false);

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
      <TasksModal
        modalOpen={openMemberModal}
        setModalOpen={setOpenMemberModal}
        memberId={member.id}
        projectId={projectId}
      />

      <Card
        hoverable
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "12px",
          border: "1px solid #f0f0f0",
          transition: "all 0.3s ease",
          cursor: "pointer",
        }}
        styles={{ body: { padding: screens.xs ? "16px" : "20px" } }}
        onClick={() => setOpenMemberModal(true)}
      >
        <Flex vertical gap={16}>
          {/* Avatar and Name */}
          <Flex align="center" gap={12}>
            <Avatar
              size={48}
              icon={<UserOutlined />}
              style={{ backgroundColor: "#1890ff" }}
            >
              {member?.name?.charAt(0) || "U"}
            </Avatar>
            
            <div>
              <Title level={5} style={{ margin: 0 }}>
                {member?.name || "Unknown Member"}
              </Title>
              <Tag color={getRoleColor(member?.role)} style={{ marginTop: 4 }}>
                {member?.role || "Member"}
              </Tag>
            </div>
          </Flex>

          {/* Email */}
          {member?.email && (
            <Flex align="center" gap={8}>
              <MailOutlined style={{ color: "#8c8c8c" }} />
              <Text type="secondary" style={{ fontSize: "12px" }}>
                {member.email}
              </Text>
            </Flex>
          )}

          {/* View Button */}
          <Button
            type="primary"
            ghost
            style={{ marginTop: 8 }}
            onClick={(e) => {
              e.stopPropagation();
              setOpenMemberModal(true);
            }}
          >
            View Member Details
          </Button>
        </Flex>
      </Card>
    </>
  );
};

export default MemberCard;