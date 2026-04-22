import React, { useEffect, useState } from "react";
import { Card, Form, Input, Button, Space, Typography, Spin, Row, Col, message } from "antd";
import { SaveOutlined, MailOutlined } from "@ant-design/icons";
import { primaryColor } from "../../Constants/Colors";
import { getUserProfile, updateUserProfile } from "../../Api/api/manager.api";

const { Title, Text } = Typography;

const ProfileForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        form.setFieldsValue({
          firstName: response.firstName || "",
          lastName: response.lastName || "",
          age: response.age || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [form]);

  const handleSave = async (values) => {
    setSaving(true);
    try {
      await updateUserProfile({
        firstName: values.firstName,
        lastName: values.lastName,
        age: parseInt(values.age) || 0,
      });

      const user = JSON.parse(localStorage.getItem("user")) || {};
      user.firstName = values.firstName;
      user.lastName = values.lastName;
      user.age = values.age;
      localStorage.setItem("user", JSON.stringify(user));

      message.success("Profile updated successfully");
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 40 }}>
        <Spin size="large" tip="Loading profile..." />
      </div>
    );
  }

  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <Space direction="vertical" size={24} style={{ width: "100%" }}>
      <Card style={{ borderRadius: 16 }}>
        <Title level={4}>Personal Information</Title>
        <Text type="secondary">Update your personal details and profile information</Text>

        <Form form={form} layout="vertical" onFinish={handleSave} style={{ marginTop: 20 }}>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: "Please enter first name" }]}>
                <Input size="large" placeholder="Enter first name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: "Please enter last name" }]}>
                <Input size="large" placeholder="Enter last name" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label="Email Address">
                <Input size="large" value={user?.email || ""} disabled  />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item name="age" label="Age">
                <Input type="number" size="large" placeholder="Enter age" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={saving} size="large" style={{ backgroundColor: primaryColor }}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card style={{ borderRadius: 16 }}>
        <Title level={4}>Account Information</Title>
        <Text type="secondary">Your account details and role</Text>

        <div style={{ marginTop: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f0f0f0" }}>
            <div>
              <Text strong>Account Type</Text>
              <br />
              <Text type="secondary" style={{ fontSize: 12 }}>Your current role</Text>
            </div>
            <span style={{ borderRadius: 20, backgroundColor: "#e6f7ff", padding: "4px 12px", fontSize: 12, fontWeight: 500, color: "#1890ff" }}>
              {user?.role || "Team Member"}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0" }}>
            <div>
              <Text strong>Account Status</Text>
              <br />
              <Text type="secondary" style={{ fontSize: 12 }}>Current status</Text>
            </div>
            <span style={{ borderRadius: 20, backgroundColor: "#f6ffed", padding: "4px 12px", fontSize: 12, fontWeight: 500, color: "#52c41a" }}>
              Active
            </span>
          </div>
        </div>
      </Card>
    </Space>
  );
};

export default ProfileForm;