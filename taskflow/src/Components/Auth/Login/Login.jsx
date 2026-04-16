import React, { useState } from "react";
import { Form, Input, Button, Typography, Row, Col, Card } from "antd";
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, ThunderboltOutlined, SafetyOutlined, StarOutlined, RocketOutlined } from "@ant-design/icons";
import { useAuth } from "../../../Context/AuthContext";
import { useTheme } from "../../../Context/DarkModeProvider";
import { Link } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

const LoginForm = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { isDarkMode } = useTheme();

  const onFinish = async (values) => {
    setLoading(true);
    const result = await login(values);
    
    if (result.success) {
      form.resetFields();
      if (onSuccess) {
        onSuccess();
      }
    }
    
    setLoading(false);
  };

  const validateEmail = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Email is required"));
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return Promise.reject(new Error("Please enter a valid email address"));
    }
    return Promise.resolve();
  };

  const validatePassword = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Password is required"));
    }
    if (value.length < 1) {
      return Promise.reject(new Error("Password is required"));
    }
    return Promise.resolve();
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: isDarkMode ? "#1a1a1a" : "#f5f5f5" }}>
      <Row style={{ width: "100%", margin: 0 }}>
        {/* Left Side - Form */}
        <Col xs={24} md={12} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "40px", background: isDarkMode ? "#2a2a2a" : "white" }}>
          <div style={{ width: "100%", maxWidth: "450px" }}>
            <Title level={2} style={{ marginBottom: "12px", color: "#8b5cf6", fontWeight: "700" }}>
              Sign In
            </Title>
            <Paragraph style={{ marginBottom: "32px", color: isDarkMode ? "#a0a0a0" : "#6b7280", fontSize: "16px" }}>
              Welcome back! Please enter your details
            </Paragraph>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
              initialValues={{ remember: true }}
            >
              <Form.Item
                label="Email Address"
                name="email"
                rules={[{ validator: validateEmail }]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: isDarkMode ? "#a0a0a0" : "#9ca3af" }} />}
                  placeholder="name@example.com"
                  size="large"
                  style={{ borderRadius: "8px", background: isDarkMode ? "#2a2a2a" : "white", borderColor: isDarkMode ? "#404040" : "#d9d9d9" }}
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ validator: validatePassword }]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: isDarkMode ? "#a0a0a0" : "#9ca3af" }} />}
                  placeholder="Enter your password"
                  size="large"
                  style={{ borderRadius: "8px", background: isDarkMode ? "#2a2a2a" : "white", borderColor: isDarkMode ? "#404040" : "#d9d9d9" }}
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <Form.Item name="remember" valuePropName="checked" noStyle style={{ marginBottom: 0 }}>
                  <span style={{ color: isDarkMode ? "#a0a0a0" : "#6b7280", fontSize: "14px" }}>Remember me</span>
                </Form.Item>
                <Link to="" style={{ color: "#8b5cf6", fontSize: "14px", fontWeight: "600" }}>
                  Forgot password?
                </Link>
              </div>

              <Form.Item style={{ marginBottom: "24px" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  size="large"
                  block
                  icon={<UserOutlined />}
                  style={{
                    height: "50px",
                    fontSize: "16px",
                    fontWeight: "600",
                    background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                    border: "none",
                    borderRadius: "8px",
                  }}
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>

            <div style={{ textAlign: "center" }}>
              <Text style={{ color: isDarkMode ? "#a0a0a0" : "#6b7280" }}>
                Don't have an account? <Link to="/sign-up" style={{ color: "#8b5cf6", fontWeight: "600" }}>Create one now</Link>
              </Text>
            </div>
          </div>
        </Col>

        {/* Right Side - Features */}
        <Col xs={24} md={12} style={{ padding: "60px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ marginBottom: "40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              
              <div>
                <Title level={3} style={{ margin: 0, color: "white", fontSize: "28px", fontWeight: "700" }}>
                  TaskFlow
                </Title>
                <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px" }}>
                  Enterprise Project Management
                </Text>
              </div>
            </div>
          </div>

          <Title level={2} style={{ marginBottom: "16px", color: "white", fontSize: "36px", fontWeight: "700" }}>
            Welcome Back! 👋
          </Title>
          <Paragraph style={{ marginBottom: "40px", color: "rgba(255,255,255,0.9)", fontSize: "18px" }}>
            Access your dashboard and continue managing your projects efficiently.
          </Paragraph>

          {/* Feature Cards */}
          <Row gutter={[16, 16]} style={{ marginBottom: "10px" }}>
            <Col xs={24}>
              <Card style={{ borderRadius: "12px", border: "none", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ width: "40px", height: "40px", background: "#8b5cf6", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ThunderboltOutlined style={{ fontSize: "20px", color: "white" }} />
                  </div>
                  <div>
                    <Title level={5} style={{ margin: 0, color: "white", fontSize: "16px", fontWeight: "600" }}>
                      Quick Access
                    </Title>
                    <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px" }}>
                      Get to your dashboard in seconds
                    </Text>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24}>
              <Card style={{ borderRadius: "12px", border: "none", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ width: "40px", height: "40px", background: "#3b82f6", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <SafetyOutlined style={{ fontSize: "20px", color: "white" }} />
                  </div>
                  <div>
                    <Title level={5} style={{ margin: 0, color: "white", fontSize: "16px", fontWeight: "600" }}>
                      Secure Login
                    </Title>
                    <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px" }}>
                      Your data is always protected
                    </Text>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24}>
              <Card style={{ borderRadius: "12px", border: "none", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ width: "40px", height: "40px", background: "#3b82f6", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <StarOutlined style={{ fontSize: "20px", color: "white" }} />
                  </div>
                  <div>
                    <Title level={5} style={{ margin: 0, color: "white", fontSize: "16px", fontWeight: "600" }}>
                      24/7 Support
                    </Title>
                    <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px" }}>
                      We're here to help anytime
                    </Text>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>

          
        </Col>
      </Row>
    </div>
  );
};

export default LoginForm;
