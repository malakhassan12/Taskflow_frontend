import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { Card, Typography, Space, Tabs, ConfigProvider } from "antd";
import ProfileForm from "../Components/Settings/ProfileForm";

const { Title, Text } = Typography;

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    {
      key: "profile",
      label: (
        <Space>
          <FiUser className="h-3.5 w-3.5" />
          Profile
        </Space>
      ),
      children: <ProfileForm />,
    },
  ];

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px" }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ marginBottom: 8 }}>
          Settings
        </Title>
        <Text type="secondary">
          Manage your account settings and preferences
        </Text>
      </div>

      {/* Tabs */}
      <Card style={{ borderRadius: 12 }}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabs}
          tabBarStyle={{ marginBottom: 24 }}
        />
      </Card>
    </div>
  );
};

export default Settings;