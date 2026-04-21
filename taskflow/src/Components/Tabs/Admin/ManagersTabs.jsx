import React, { useState, useEffect } from "react";
import { Badge, Tabs, Card, Typography, Button, Avatar, Tag, Space, message, theme } from "antd";
import { Mail, Building2, Calendar, Check, X } from "lucide-react";
import { useTheme } from "../../../Context/DarkModeProvider";
import ManagerModal from "../../Modals/Admin/ManagerModal";
import { getUserWithStatus, approveUser, rejectUser } from "../../../Api/api/manager.api";

const { Title, Text } = Typography;

const ManagersTabs = () => {
  const { isDarkMode } = useTheme();
  const { token } = theme.useToken();
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);
  const [pendingManagers, setPendingManagers] = useState([]);

  useEffect(() => {
    fetchPendingManagers();
  }, []);

  const fetchPendingManagers = async () => {
    try {
      const res = await getUserWithStatus();
      const mappedData = Array.isArray(res) ? res.map((user) => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        company: "",
        role: user.role,
        requestDate: user.createdAT ? new Date(user.createdAT).toISOString().split('T')[0] : "",
        avatar: user.firstName ? user.firstName[0].toUpperCase() : "U",
        avatarColor: "#3b82f6",
      })) : [];
      setPendingManagers(mappedData);
    } catch (error) {
      console.error("Error fetching pending managers:", error);
    }
  };

  const handleViewDetails = (record) => {
    setSelectedManager(record);
    setViewModalOpen(true);
  };

  const handleApprove = async (managerId) => {
    try {
      await approveUser(managerId);
      message.success(`${pendingManagers.find(m => m.id === managerId)?.name} has been approved as Project Manager`);
      setPendingManagers(pendingManagers.filter(m => m.id !== managerId));
    } catch (error) {
      console.error("Error approving manager:", error);
      message.error("Failed to approve manager");
    }
  };

  const handleReject = async (managerId) => {
    try {
      await rejectUser(managerId);
      message.warning(`${pendingManagers.find(m => m.id === managerId)?.name} request has been rejected`);
      setPendingManagers(pendingManagers.filter(m => m.id !== managerId));
    } catch (error) {
      console.error("Error rejecting manager:", error);
      message.error("Failed to reject manager");
    }
  };

  const tabItems = [
    {
      key: "pending",
      label: (
        <span>
          Pending Approval <Badge count={pendingManagers.length} offset={[10, -2]} size="small" />
        </span>
      ),
      children: (
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
      ),
    },
  ];

  return (
    <Card style={{ padding: "24px" }}>
      <ManagerModal
        viewModalOpen={viewModalOpen}
        setViewModalOpen={setViewModalOpen}
        selectedManager={selectedManager}
      />
      <Tabs 
        defaultActiveKey="pending" 
        size="large" 
        items={tabItems} 
        animated={{ inkBar: true, tabPane: true }}
      />
    </Card>
  );
};

export default ManagersTabs;