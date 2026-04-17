import React, { useState } from "react";
import { Form, Input, Button, Typography, Row, Col, Card, message, Checkbox, Radio } from "antd";
import { UserOutlined, MailOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, ThunderboltOutlined, SafetyOutlined, StarOutlined, RocketOutlined } from "@ant-design/icons";
import { useAuth } from "../../../Context/AuthContext";
import { useTheme } from "../../../Context/DarkModeProvider";
import { Link } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

const SignUpForm = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const { isDarkMode } = useTheme();

  const onFinish = async (values) => {
    setLoading(true);
    const result = await signup(values);
    
    if (result.success) {
      form.resetFields();
      if (onSuccess) {
        onSuccess(result);
      }
    }
    
    setLoading(false);
  };

  const validatePassword = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Password is required"));
    }
    if (value.length < 6) {
      return Promise.reject(new Error("Password must be at least 6 characters"));
    }
    return Promise.resolve();
  };

  const validateConfirmPassword = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Please confirm your password"));
    }
    if (value !== form.getFieldValue("password")) {
      return Promise.reject(new Error("Passwords do not match"));
    }
    return Promise.resolve();
  };

  const validateFirstName = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("First name is required"));
    }
    if (value.trim().length < 2) {
      return Promise.reject(new Error("First name must be at least 2 characters"));
    }
    return Promise.resolve();
  };

  const validateLastName = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Last name is required"));
    }
    if (value.trim().length < 2) {
      return Promise.reject(new Error("Last name must be at least 2 characters"));
    }
    return Promise.resolve();
  };

  const validateAge = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Age is required"));
    }
    if (value < 18) {
      return Promise.reject(new Error("You must be at least 18 years old"));
    }
    if (value > 120) {
      return Promise.reject(new Error("Please enter a valid age"));
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
              Create Account
            </Title>
            <Paragraph style={{ marginBottom: "32px", color: isDarkMode ? "#a0a0a0" : "#6b7280", fontSize: "16px" }}>
              Join TaskFlow and start managing your projects
            </Paragraph>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[{ validator: validateFirstName }]}
                  >
                    <Input
                      prefix={<UserOutlined style={{ color: isDarkMode ? "#a0a0a0" : "#9ca3af" }} />}
                      placeholder="John"
                      size="large"
                      style={{ borderRadius: "8px", background: isDarkMode ? "#2a2a2a" : "white", borderColor: isDarkMode ? "#404040" : "#d9d9d9" }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[{ validator: validateLastName }]}
                  >
                    <Input
                      prefix={<UserOutlined style={{ color: isDarkMode ? "#a0a0a0" : "#9ca3af" }} />}
                      placeholder="Doe"
                      size="large"
                      style={{ borderRadius: "8px", background: isDarkMode ? "#2a2a2a" : "white", borderColor: isDarkMode ? "#404040" : "#d9d9d9" }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Age"
                name="age"
                rules={[{ validator: validateAge }]}
              >
                <Input
                  type="number"
                  prefix={<UserOutlined style={{ color: isDarkMode ? "#a0a0a0" : "#9ca3af" }} />}
                  placeholder="18+"
                  size="large"
                  style={{ borderRadius: "8px", background: isDarkMode ? "#2a2a2a" : "white", borderColor: isDarkMode ? "#404040" : "#d9d9d9" }}
                  min={18}
                  max={120}
                />
              </Form.Item>

              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  { required: true, message: "Email is required" },
                  { type: "email", message: "Please enter a valid email address" },
                ]}
              >
                <Input
                  prefix={<MailOutlined style={{ color: isDarkMode ? "#a0a0a0" : "#9ca3af" }} />}
                  placeholder="name@example.com"
                  size="large"
                  style={{ borderRadius: "8px", background: isDarkMode ? "#2a2a2a" : "white", borderColor: isDarkMode ? "#404040" : "#d9d9d9" }}
                />
              </Form.Item>

              <Form.Item
                label="I want to sign up as"
                name="role"
                rules={[{ required: true, message: "Please select a role" }]}
                initialValue="member"
              >
                <Radio.Group size="large" style={{ width: "100%" }}>
                  <Radio.Button value="member" style={{ width: "50%", textAlign: "center" }}>
                    User
                  </Radio.Button>
                  <Radio.Button value="manager" style={{ width: "50%", textAlign: "center" }}>
                    Project Manager
                  </Radio.Button>
                </Radio.Group>
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

              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                rules={[{ validator: validateConfirmPassword }]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: isDarkMode ? "#a0a0a0" : "#9ca3af" }} />}
                  placeholder="Confirm your password"
                  size="large"
                  style={{ borderRadius: "8px", background: isDarkMode ? "#2a2a2a" : "white", borderColor: isDarkMode ? "#404040" : "#d9d9d9" }}
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>

              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value ? Promise.resolve() : Promise.reject(new Error("You must accept the terms and conditions")),
                  },
                ]}
              >
                <Checkbox>
                  I agree to the <Link to="/terms" style={{ color: "#8b5cf6" }}>Terms of Service</Link> and <Link to="/privacy" style={{ color: "#8b5cf6" }}>Privacy Policy</Link>
                </Checkbox>
              </Form.Item>

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
                  Create Account
                </Button>
              </Form.Item>
            </Form>

            <div style={{ textAlign: "center" }}>
              <Text style={{ color: isDarkMode ? "#a0a0a0" : "#6b7280" }}>
                Already have an account? <Link to="/login" style={{ color: "#8b5cf6", fontWeight: "600" }}>Sign in here</Link>
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
            Start your journey! 🚀
          </Title>
          <Paragraph style={{ marginBottom: "40px", color: "rgba(255,255,255,0.9)", fontSize: "18px" }}>
            Join thousands of teams already using TaskFlow to streamline their workflow.
          </Paragraph>

          {/* Feature Cards */}
          <Row gutter={[16, 16]} style={{ marginBottom: "32px" }}>
            <Col xs={24}>
              <Card style={{ borderRadius: "12px", border: "none", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ width: "40px", height: "40px", background: "#8b5cf6", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ThunderboltOutlined style={{ fontSize: "20px", color: "white" }} />
                  </div>
                  <div>
                    <Title level={5} style={{ margin: 0, color: "white", fontSize: "16px", fontWeight: "600" }}>
                      Quick Setup
                    </Title>
                    <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px" }}>
                      Get started in under 2 minutes
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
                      Role-Based Access
                    </Title>
                    <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px" }}>
                      Choose your role and get the right tools
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
                      Premium Features
                    </Title>
                    <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px" }}>
                      Access all features from day one
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

export default SignUpForm;
