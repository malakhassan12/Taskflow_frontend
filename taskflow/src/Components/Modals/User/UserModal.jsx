import React from 'react';
import { Modal, Space, Typography, Tag, Divider, Avatar, Card, Row, Col } from 'antd';
import { MailOutlined, ProjectOutlined, FileTextOutlined, BellOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const UserModal = ({ open, setOpen, selectedMember }) => {
  if (!selectedMember) return null;


  console.log(selectedMember)
  return (
    <Modal
      title={
        <Space>
          <Avatar style={{ backgroundColor: "#1677ff" }}>
            {selectedMember.name?.charAt(0)}
          </Avatar>
          <div>
            <Title level={4} style={{ margin: 0 }}>
              {selectedMember.name}
            </Title>
            <Tag color="blue">{selectedMember.role}</Tag>
          </div>
        </Space>
      }
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width={450}
    >
      <Divider />
      
      {/* Email */}
      <div style={{ marginBottom: 20 }}>
        <Text type="secondary">Email</Text>
        <div>
          <MailOutlined style={{ marginRight: 8, color: "#1890ff" }} />
          <Text>{selectedMember.email}</Text>
        </div>
      </div>

      {/* Statistics */}
      <Text type="secondary">Statistics</Text>
      <Row gutter={[12, 12]} style={{ marginTop: 8 }}>
        <Col span={8}>
          <Card size="small">
            <ProjectOutlined style={{ fontSize: 20, color: "#1677ff" }} />
            <Title level={3}>{selectedMember.projectsCount}</Title>
            <Text type="secondary">Projects</Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <FileTextOutlined style={{ fontSize: 20, color: "#722ed1" }} />
            <Title level={3}>{selectedMember.tasksCount}</Title>
            <Text type="secondary">Tasks</Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <BellOutlined style={{ fontSize: 20, color: "#faad14" }} />
            <Title level={3}>{selectedMember.notificationsCount}</Title>
            <Text type="secondary">Notif.</Text>
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* User ID */}
      <Text type="secondary" style={{ fontSize: 12 }}>
        ID: {selectedMember.id}
      </Text>
    </Modal>
  );
};

export default UserModal;