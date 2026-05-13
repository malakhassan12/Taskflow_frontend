import { Button, Typography, Flex, Row, Col, Spin, Empty } from "antd";
import { UserAddOutlined, TeamOutlined } from "@ant-design/icons";
import MemberCard from "../../Cards/MemberCard";
import { useParams } from "react-router-dom";
import useGetAllMembersPerProject from "../../../Hooks/Manager/useGetAllMembersPerProject";
import DataError from "../../Error/DataError";
import DataLoad from "../../Loaders/DataLoad";

const { Title, Text } = Typography;

const TeamTab = () => {
  const { projectId } = useParams();
  const {
    data: members,
    isLoading,
    error,
  } = useGetAllMembersPerProject(projectId);



  console.log(members)
  if (isLoading) {
    return <DataLoad />;
  }

  if (error) {
    return <DataError />;
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
        <DataError />
      ) : (
        <Row gutter={[16, 16]}>
          {members?.map((member) => (
            <Col xs={24} sm={12} lg={8} xl={6} key={member.user?.id}>
              <MemberCard member={member} projectId={projectId} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default TeamTab;
