import React from 'react';
// ==================== Ant Design ====================
import { Card, Row, Col, Typography, Button, Avatar, Tag, Space, message, theme } from "antd";
// ==================== Icons ====================
import { User, Mail, Building2, Calendar, Check, X } from "lucide-react";
// ==================== Context ====================
import { useTheme } from "../../Context/DarkModeProvider";

const { Title, Text } = Typography;

const DashboardApproval = () => {
  const { isDarkMode } = useTheme();
  const { token } = theme.useToken();
  const [pendingManagers, setPendingManagers] = React.useState([
    {
      id: 1,
      name: "Ahmed Mohamed",
      email: "ahmed.mohamed@example.com",
      company: "Tech Solutions",
      role: "Project Manager",
      requestDate: "2024-04-10",
      avatar: "A",
      avatarColor: "#3b82f6",
    },
    {
      id: 2,
      name: "Sara Ali",
      email: "sara.ali@example.com",
      company: "Digital Innovations",
      role: "Project Manager",
      requestDate: "2024-04-11",
      avatar: "S",
      avatarColor: "#8b5cf6",
    },
    {
      id: 3,
      name: "Omar Hassan",
      email: "omar.hassan@example.com",
      company: "Cloud Systems",
      role: "Project Manager",
      requestDate: "2024-04-12",
      avatar: "O",
      avatarColor: "#22c55e",
    },
    {
      id: 4,
      name: "Laila Ahmed",
      email: "laila.ahmed@example.com",
      company: "Smart Tech",
      role: "Project Manager",
      requestDate: "2024-04-13",
      avatar: "L",
      avatarColor: "#ec4899",
    },
  ]);

  const handleApprove = (managerId) => {
    message.success(`${pendingManagers.find(m => m.id === managerId)?.name} has been approved as Project Manager`);
    setPendingManagers(pendingManagers.filter(m => m.id !== managerId));
  };

  const handleReject = (managerId) => {
    message.warning(`${pendingManagers.find(m => m.id === managerId)?.name} request has been rejected`);
    setPendingManagers(pendingManagers.filter(m => m.id !== managerId));
  };

  return (
    <div style={{ marginTop: "32px" }}>
      <Card
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <User size={24} color="#f97316" />
            <Title level={4} style={{ margin: 0 }}>Pending Project Manager Approvals</Title>
            <Tag color="orange" style={{ marginLeft: "8px" }}>{pendingManagers.length}</Tag>
          </div>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {pendingManagers.map((manager) => (
            <div
              key={manager.id}
              style={{
                border: isDarkMode ? "1px solid #303030" : "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "20px",
                background: isDarkMode ? token.colorBgContainer : "white",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              {/* Avatar */}
              <Avatar
                size={64}
                style={{
                  backgroundColor: manager.avatarColor,
                  fontSize: "24px",
                  fontWeight: "600",
                  flexShrink: 0,
                }}
              >
                {manager.avatar}
              </Avatar>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                  <Title level={5} style={{ margin: 0, color: isDarkMode ? token.colorText : "inherit" }}>
                    {manager.name}
                  </Title>
                  <Tag color="blue" style={{ margin: 0 }}>{manager.role}</Tag>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Mail size={16} color={isDarkMode ? token.colorText : "#6b7280"} />
                    <Text type="secondary" style={{ fontSize: "14px", color: isDarkMode ? token.colorTextSecondary : "inherit" }}>
                      {manager.email}
                    </Text>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Building2 size={16} color={isDarkMode ? token.colorText : "#6b7280"} />
                    <Text type="secondary" style={{ fontSize: "14px", color: isDarkMode ? token.colorTextSecondary : "inherit" }}>
                      {manager.company}
                    </Text>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Calendar size={16} color={isDarkMode ? token.colorText : "#6b7280"} />
                    <Text type="secondary" style={{ fontSize: "14px", color: isDarkMode ? token.colorTextSecondary : "inherit" }}>
                      Requested: {manager.requestDate}
                    </Text>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <Space>
                <Button
                  type="primary"
                  icon={<Check size={16} />}
                  onClick={() => handleApprove(manager.id)}
                  style={{
                    background: "#22c55e",
                    borderColor: "#22c55e",
                    borderRadius: "8px",
                    height: "40px",
                  }}
                >
                  Approve
                </Button>
                <Button
                  danger
                  icon={<X size={16} />}
                  onClick={() => handleReject(manager.id)}
                  style={{
                    borderRadius: "8px",
                    height: "40px",
                  }}
                >
                  Reject
                </Button>
              </Space>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DashboardApproval;
