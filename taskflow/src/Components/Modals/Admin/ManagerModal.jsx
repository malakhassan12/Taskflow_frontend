import { Tag, Button, Space, Typography, Avatar, Modal, message, Divider, Card, Row, Col } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  UserOutlined,
  MailOutlined,
  CalendarOutlined,
  IdcardOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { formatRegistrationDate, getTimeAgo } from "../../../Utils/TimeFormatt";
import useAdminMutations from "../../../Hooks/Admin/useAdminMutations";

const { Title, Text } = Typography;

const ManagerModal = ({ viewModalOpen, setViewModalOpen, selectedManager }) => {
  const { approveManagerMutation, rejectManagerMutation } = useAdminMutations();
  const [messageApi, contextHolder] = message.useMessage();

  console.log(selectedManager)

  const handleApprove = () => {
    if (!selectedManager?.id) {
      messageApi.warning("User ID not found");
      return;
    }
    approveManagerMutation.mutate(selectedManager.id, {
      onSuccess: () => {
        messageApi.success("Manager approved successfully");
        setViewModalOpen(false);
      },
    });
  };

  const handleReject = () => {
    if (!selectedManager?.id) {
      messageApi.warning("User ID not found");
      return;
    }
    rejectManagerMutation.mutate(selectedManager.id, {
      onSuccess: () => {
        messageApi.success("Manager rejected successfully");
        setViewModalOpen(false);
      },
    });
  };

  const getStatusConfig = (status) => {
    const config = {
      pending: { color: "orange", text: "Pending", icon: "⏳" },
      approved: { color: "green", text: "Approved", icon: "✅" },
      rejected: { color: "red", text: "Rejected", icon: "❌" },
    };
    return config[status?.toLowerCase()] || config.pending;
  };

  const statusConfig = getStatusConfig(selectedManager?.status);
  const isPending = selectedManager?.status?.toLowerCase() === "pending";

  return (
    <>
      {contextHolder}
      <Modal
        title={
          <Space size={12}>
            <Avatar 
              icon={<UserOutlined />} 
              style={{ backgroundColor: "#1890ff" }}
            />
            <div>
              <Text strong style={{ fontSize: 16 }}>Manager Details</Text>
              <br />
              <Text type="secondary" style={{ fontSize: 12 }}>
                {selectedManager?.role || "Project Manager"}
              </Text>
            </div>
          </Space>
        }
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalOpen(false)}>
            Close
          </Button>,
          isPending && (
            <Button
              key="reject"
              danger
              icon={<CloseCircleOutlined />}
              loading={rejectManagerMutation.isPending}
              onClick={handleReject}
            >
              Reject
            </Button>
          ),
          isPending && (
            <Button
              key="approve"
              type="primary"
              icon={<CheckCircleOutlined />}
              loading={approveManagerMutation.isPending}
              onClick={handleApprove}
              style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
            >
              Approve
            </Button>
          ),
        ]}
        width={520}
        centered
      >
        {selectedManager && (
          <div style={{ padding: "8px 0" }}>
            {/* Profile Header */}
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <Avatar
                size={80}
                style={{ 
                  backgroundColor: "#1677ff",
                  marginBottom: 12
                }}
              >
                {selectedManager.firstName?.charAt(0)}
                {selectedManager.lastName?.charAt(0)}
              </Avatar>
              <Title level={4} style={{ marginBottom: 4 }}>
                {selectedManager.firstName} {selectedManager.lastName}
              </Title>
              <Space size={8}>
                <Tag color={statusConfig.color}>
                  {statusConfig.icon} {statusConfig.text}
                </Tag>
                <Tag color="blue">{selectedManager.role}</Tag>
              </Space>
            </div>

            <Divider style={{ margin: "12px 0" }} />

            {/* Information Cards */}
            <Row gutter={[12, 12]}>
              <Col span={24}>
                <Card size="small" style={{ borderRadius: 8 }}>
                  <Space direction="vertical" size={12} style={{ width: "100%" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <MailOutlined style={{ color: "#1890ff", fontSize: 16 }} />
                      <div>
                        <Text type="secondary" style={{ fontSize: 12 }}>Email</Text>
                        <div>
                          <Text strong>{selectedManager.email}</Text>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <IdcardOutlined style={{ color: "#52c41a", fontSize: 16 }} />
                      <div>
                        <Text type="secondary" style={{ fontSize: 12 }}>Age</Text>
                        <div>
                          <Text strong>{selectedManager.age || "N/A"} years</Text>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <CalendarOutlined style={{ color: "#faad14", fontSize: 16 }} />
                      <div>
                        <Text type="secondary" style={{ fontSize: 12 }}>Registered On</Text>
                        <div>
                          <Text strong>
                            {formatRegistrationDate(selectedManager.createdAT)}
                          </Text>
                          <br />
                          <Text type="secondary" style={{ fontSize: 11 }}>
                            {getTimeAgo(selectedManager.createdAT)}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </Space>
                </Card>
              </Col>

              {/* Projects & Tasks Summary */}
            
            </Row>

            {/* Status Note */}
            {isPending && (
              <div style={{ 
                marginTop: 16, 
                padding: 12, 
                backgroundColor: "#fff7e6", 
                borderRadius: 8,
                borderLeft: `3px solid ${statusConfig.color}`
              }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  This manager is awaiting your approval. Review their information and approve or reject accordingly.
                </Text>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

export default ManagerModal;