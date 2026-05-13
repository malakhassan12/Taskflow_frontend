import React from 'react';
import { Modal, Typography, Tag, Space, Avatar, Divider, Badge, Row, Col, Progress, theme, Card, Statistic } from 'antd';
import {
  UserOutlined, ProjectOutlined, CheckCircleOutlined,
  TeamOutlined, PhoneOutlined, IdcardOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const MemberModal = ({ viewModalOpen, setViewModalOpen, selectedMember }) => {
  const { token } = theme.useToken();

  if (!selectedMember) return null;

  // Calculate completion percentage
  const completionPercentage = selectedMember.number_of_tasks > 0 
    ? (selectedMember.completed_tasks / selectedMember.number_of_tasks) * 100 
    : 0;

  return (
    <Modal
      open={viewModalOpen}
      onCancel={() => setViewModalOpen(false)}
      footer={null}
      width={700}
      centered
      style={{ maxWidth: '95vw' }}
      title={
        <Space>
          <UserOutlined style={{ color: token.colorPrimary }} />
          <span style={{ fontWeight: 600 }}>Team Member Profile</span>
        </Space>
      }
    >
      <div style={{ paddingTop: '16px' }}>
        
        {/* Header Section */}
        <Row gutter={[24, 16]} align="middle">
          <Col xs={24} sm={6} style={{ textAlign: 'center' }}>
            <Avatar
              size={{ xs: 80, sm: 100, md: 110 }}
              style={{ backgroundColor: token.colorPrimary }}
            >
              {selectedMember.user?.name?.charAt(0) || 'U'}
            </Avatar>
          </Col>
          <Col xs={24} sm={18}>
            <div style={{ textAlign: 'center', sm: { textAlign: 'left' } }}>
              <Title level={3} style={{ margin: 0 }}>{selectedMember.user?.name}</Title>
              <Space wrap style={{ marginTop: 8 }}>
                {/* Display tags from API */}
                {selectedMember.tags?.map(tag => (
                  <Tag key={tag} color="blue" icon={<TeamOutlined />}>
                    {tag.replace('-', ' ').toUpperCase()}
                  </Tag>
                ))}
                <Badge
                  status={selectedMember.status === 'active' ? 'success' : 'error'}
                  text={selectedMember.status === 'active' ? 'Active' : 'Inactive'}
                />
              </Space>
            </div>
          </Col>
        </Row>

        <Divider />

        {/* Key Metrics Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12}>
            <Card size="small">
              <Statistic
                title="Project"
                value={selectedMember.project_name || 'N/A'}
                prefix={<ProjectOutlined />}
                valueStyle={{ fontSize: '16px' }}
              />
              <Text type="secondary" style={{ fontSize: '12px' }}>
                ID: {selectedMember.project_id}
              </Text>
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card size="small">
              <Statistic
                title="Task Completion"
                value={`${selectedMember.completed_tasks}/${selectedMember.number_of_tasks}`}
                prefix={<CheckCircleOutlined />}
              />
              <Progress 
                percent={Math.round(completionPercentage)} 
                size="small" 
                status={completionPercentage === 100 ? 'success' : 'active'}
                style={{ marginTop: 8 }}
              />
            </Card>
          </Col>
        </Row>

        {/* Details Grid */}
        <Row gutter={[32, 24]}>
          {/* Member Info */}
          <Col xs={24} md={12}>
            <Title level={5}>Member Details</Title>
            <Space direction="vertical" size={12}>
              <Text>
                <IdcardOutlined style={{ color: token.colorPrimary, marginRight: 8 }} /> 
                Team ID: {selectedMember.teamMemberId}
              </Text>
              <Text>
                <PhoneOutlined style={{ color: token.colorPrimary, marginRight: 8 }} /> 
                Phone: {selectedMember.phone || 'Not provided'}
              </Text>
              <Text>
                <CheckCircleOutlined style={{ color: token.colorPrimary, marginRight: 8 }} /> 
                Tasks: {selectedMember.number_of_tasks} total ({selectedMember.completed_tasks} completed)
              </Text>
            </Space>
          </Col>

          {/* Project Info */}
          <Col xs={24} md={12}>
            <Title level={5}>Project Information</Title>
            <Space direction="vertical" size={12}>
              <Text strong>Project Name:</Text>
              <Text>{selectedMember.project_name}</Text>
              <Text strong>Project ID:</Text>
              <Text code>{selectedMember.project_id}</Text>
            </Space>
          </Col>
        </Row>

        <Divider />

        {/* Key Information Card */}
        <div style={{ 
          padding: 16, 
          backgroundColor: token.colorFillAlter, 
          borderRadius: 12,
          marginTop: 8
        }}>
          <Space direction="vertical" size={8} style={{ width: '100%' }}>
            <Text strong>Quick Summary</Text>
            <Text type="secondary">
              {selectedMember.user?.name} is currently working on {selectedMember.project_name}
              with {selectedMember.number_of_tasks} assigned tasks,
              {selectedMember.completed_tasks === 0 ? ' none of which have been completed yet.' : ` ${selectedMember.completed_tasks} have been completed.`}
            </Text>
            <Tag color={selectedMember.status === 'active' ? 'green' : 'red'} style={{ marginTop: 8 }}>
              Status: {selectedMember.status}
            </Tag>
          </Space>
        </div>
      </div>
    </Modal>
  );
};

export default MemberModal;