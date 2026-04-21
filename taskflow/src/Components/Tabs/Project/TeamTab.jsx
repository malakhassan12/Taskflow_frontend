import { Button, Typography, Flex, Row, Col, Spin, Empty } from "antd";
import { UserAddOutlined, TeamOutlined } from "@ant-design/icons";
import MemberCard from "../../Cards/MemberCard";
import { useParams } from "react-router-dom";
import useGetAllMembersPerProject from "../../../Hooks/Manager/useGetAllMembersPerProject";

const { Title, Text } = Typography;

const TeamTab = () => {
  const { projectId } = useParams();
  const {
    data: members,
    isLoading,
    error,
  } = useGetAllMembersPerProject(projectId);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: 400 }}>
        <Spin size="large" tip="Loading team members..." />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: 400 }}>
        <Empty description="Failed to load team members" />
      </Flex>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      {/* Header Section */}
      <Flex
        justify="space-between"
        align="flex-start"
        style={{ marginBottom: 32, flexWrap: "wrap", gap: "1rem" }}
      >
        <div>
          <Title level={4} style={{ margin: 0 }}>
            <TeamOutlined /> Team Members ({members?.length || 0})
          </Title>
          <Text type="secondary">
            Manage team members and their assignments
          </Text>
        </div>
      </Flex>

      {/* Grid of Cards */}
      {members?.length === 0 ? (
        <Empty description="No team members found" />
      ) : (
        <Row gutter={[16, 16]}>
          {members?.map((member) => (
            <Col xs={24} sm={12} lg={8} xl={6} key={member.id}>
              <MemberCard member={member} projectId={projectId} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default TeamTab;
