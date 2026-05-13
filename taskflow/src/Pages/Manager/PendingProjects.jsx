import React, { useState } from "react";
import {
  Card,
  Tag,
  Button,
  Space,
  Typography,
  Badge,
  Empty,
  Row,
  Col,
  Modal,
  Divider,
  Spin,
  Avatar,
} from "antd";
import {
  EyeOutlined,
  TeamOutlined,
  UserOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import useGetPendingProjects from "../../Hooks/Manager/useGetPerndingProjects";
import dayjs from "dayjs";
import CardSkeleton from "../../Components/Skelton/CardSkelton";
const { Title, Text, Paragraph } = Typography;

const PendingProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: projects, isLoading } = useGetPendingProjects();

  const handleViewDetails = (record) => {
    setSelectedProject(record);
    setModalOpen(true);
  };

  if (isLoading) {
    return (
   <Row gutter={[16, 16]}>
  {Array.from({ length: 5 }).map((_, index) => (
    <Col xs={24} sm={12} lg={8} xl={6} key={index}>
      <CardSkeleton />
    </Col>
  ))}
</Row>
    );
  }

  return (
    <div style={{ padding: "16px", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: "20px" }}>
        <Title level={4} style={{ margin: 0, fontWeight: 600 }}>
          Pending Projects
        </Title>
        <Text type="secondary">Projects waiting for admin approval</Text>
      </div>

      {projects?.length > 0 ? (
        <Row gutter={[16, 16]}>
          {projects.map((project) => (
            <Col xs={24} sm={12} lg={8} key={project.id}>
              <Card
                hoverable
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
                  height: "100%",
                }}
                styles={{ body: { padding: "16px" } }}
              >
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "12px",
                  }}
                >
                  <div>
                    <Text strong style={{ fontSize: "16px" }}>
                      {project.name}
                    </Text>
                    <div style={{ marginTop: "4px" }}>
                      <Tag color="blue" style={{ fontSize: "11px" }}>
                        ID: {project.id}
                      </Tag>
                    </div>
                  </div>
                  <Badge status="warning" text={project.status || "Pending"} />
                </div>

                <Divider style={{ margin: "12px 0" }} />

                {/* Description */}
                {project.description && (
                  <Paragraph
                    type="secondary"
                    ellipsis={{ rows: 2 }}
                    style={{ marginBottom: "12px", fontSize: "13px" }}
                  >
                    {project.description}
                  </Paragraph>
                )}

                {/* Manager Info */}
                {project.maneger && (
                  <div style={{ marginBottom: "12px" }}>
                    <Space>
                      <UserOutlined style={{ color: "#94a3b8" }} />
                      <Text type="secondary">
                        Manager: {project.maneger.firstName}{" "}
                        {project.maneger.lastName}
                      </Text>
                    </Space>
                  </div>
                )}

                {/* Team Info */}
                <div style={{ marginBottom: "12px" }}>
                  <Space>
                    <TeamOutlined style={{ color: "#94a3b8" }} />
                    <Text type="secondary">
                      {project.users?.length || 0} Team Members
                    </Text>
                  </Space>
                </div>

                {/* Tasks Info */}
                <div style={{ marginBottom: "16px" }}>
                  <Space>
                    <CheckCircleOutlined style={{ color: "#94a3b8" }} />
                    <Text type="secondary">
                      {project.tasks?.length || 0} Tasks
                    </Text>
                  </Space>
                </div>

                {/* Dates */}
                <div style={{ marginBottom: "16px" }}>
                  <Space orientation="vertical" size={4}>
                    <Space>
                      <CalendarOutlined style={{ color: "#94a3b8" }} />
                      <Text type="secondary">
                        Start: {dayjs(project.startDate).format("YYYY-MM-DD")}
                      </Text>
                    </Space>
                    <Space>
                      <ClockCircleOutlined style={{ color: "#94a3b8" }} />
                      <Text type="secondary">
                        End: {dayjs(project.endDate).format("YYYY-MM-DD")}
                      </Text>
                    </Space>
                  </Space>
                </div>

                {/* View Button */}
                <Button
                  type="primary"
                  icon={<EyeOutlined />}
                  onClick={() => handleViewDetails(project)}
                  style={{ width: "100%" }}
                  ghost
                >
                  View Details
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Card
          style={{ borderRadius: "12px", textAlign: "center", padding: "40px" }}
        >
          <Empty description="No pending projects" />
        </Card>
      )}

      {/* Project Details Modal */}
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        width={550}
        footer={[
          <Button key="close" onClick={() => setModalOpen(false)}>
            Close
          </Button>,
        ]}
        title={
          <Space>
            <FileTextOutlined style={{ color: "#6366f1" }} />
            <span>Project Details</span>
          </Space>
        }
      >
        {selectedProject && (
          <div>
            {/* Project Title */}
            <Title level={4} style={{ marginBottom: 4 }}>
              {selectedProject.name}
            </Title>
            <Space>
              <Tag color="blue">ID: {selectedProject.id}</Tag>
              <Badge
                status="warning"
                text={selectedProject.status || "Pending"}
              />
            </Space>

            <Divider />

            {/* Description */}
            <Text strong>Description</Text>
            <Paragraph style={{ marginTop: "8px" }}>
              {selectedProject.description || "No description provided"}
            </Paragraph>

            {/* Manager */}
            {selectedProject.maneger && (
              <>
                <Text strong>Project Manager</Text>
                <div style={{ marginTop: "8px", marginBottom: "16px" }}>
                  <Tag icon={<UserOutlined />} color="blue">
                    {selectedProject.maneger.firstName}{" "}
                    {selectedProject.maneger.lastName}
                  </Tag>
                </div>
              </>
            )}

            {/* Team Members */}
            <Text strong>Team Members</Text>
            <div style={{ marginTop: "8px", marginBottom: "16px" }}>
              {selectedProject.users?.length > 0 ? (
                <Space wrap>
                  {selectedProject.users.map((user, idx) => (
                    <Tag key={idx} icon={<UserOutlined />} color="geekblue">
                      {user.firstName} {user.lastName}
                    </Tag>
                  ))}
                </Space>
              ) : (
                <Text type="secondary">No team members assigned</Text>
              )}
            </div>

            {/* Timeline */}
            <Text strong>Timeline</Text>
            <div style={{ marginTop: "8px", marginBottom: "16px" }}>
              <Space orientation="vertical">
                <Text type="secondary">
                  <CalendarOutlined /> Start Date:{" "}
                  {dayjs(selectedProject.startDate).format("YYYY-MM-DD")}
                </Text>
                <Text type="secondary">
                  <ClockCircleOutlined /> End Date:{" "}
                  {dayjs(selectedProject.endDate).format("YYYY-MM-DD")}
                </Text>
              </Space>
            </div>

            {/* Tasks */}
            <Text strong>Tasks</Text>
            <div style={{ marginTop: "8px", marginBottom: "16px" }}>
              <Tag color="green">
                {selectedProject.tasks?.length || 0} Tasks
              </Tag>
            </div>

            <Divider />

            <Badge
              status="warning"
              text="Waiting for admin approval"
              style={{ marginTop: "8px" }}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PendingProjects;
