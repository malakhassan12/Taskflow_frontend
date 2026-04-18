import { Tag, Button, Space, Typography, Avatar, Modal, message } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { formatRegistrationDate, getTimeAgo } from "../../../Utils/TimeFormatt";
import useAdminMutations from "../../../Hooks/Admin/useAdminMutations";

const { Title, Text } = Typography;

const ManagerModal = ({ viewModalOpen, setViewModalOpen, selectedManager }) => {
  const { approveManagerMutation, rejectManagerMutation } = useAdminMutations();
  const [messageApi, contextHolder] = message.useMessage();

  const handleApprove = () => {
    console.log(selectedManager?.id);
    if (!selectedManager?.id)
      messageApi.open({
        type: "warning",
        content: "Dont Exist Userid",
      });

    approveManagerMutation.mutate(selectedManager.id, {});
  };

  const handleReject = () => {
    if (!selectedManager?.id)
      messageApi.open({
        type: "warning",
        content: "Dont Exist Userid",
      });

    rejectManagerMutation.mutate(selectedManager.id, {});
  };

  console.log(selectedManager);
  return (
    <>
      {" "}
      {contextHolder}
      <Modal
        title={
          <Space>
            <UserOutlined />
            <span>Manager Details</span>
          </Space>
        }
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        footer={[
          <Button
            key="close"
            onClick={() => setViewModalOpen(false)}
            loading={
              approveManagerMutation.isPending ||
              rejectManagerMutation.isPending
            }
            disabled={
              rejectManagerMutation.isPending || rejectManagerMutation.isPending
            }
          >
            Close
          </Button>,
          selectedManager?.status === "pending" && (
            <Button
              key="approve"
              type="primary"
              icon={<CheckCircleOutlined />}
              loading={approveManagerMutation.isPending}
              disabled={rejectManagerMutation.isPending}
              onClick={() => {
                if (selectedManager) {
                  handleApprove(selectedManager);
                  setViewModalOpen(false);
                }
              }}
              style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
            >
              Approve Manager
            </Button>
          ),
          selectedManager?.status === "pending" && (
            <Button
              key="reject"
              danger
              icon={<CloseCircleOutlined />}
              loading={rejectManagerMutation.isPending}
              disabled={rejectManagerMutation.isPending}
              onClick={() => {
                if (selectedManager) {
                  handleReject(selectedManager);
                  setViewModalOpen(false);
                }
              }}
            >
              Reject Manager
            </Button>
          ),
        ]}
        width={500}
      >
        {selectedManager && (
          <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Avatar
                size={64}
                style={{ backgroundColor: selectedManager?.avatarColor }}
              >
                {selectedManager?.firstName.charAt(0)}
              </Avatar>
              <div>
                <Title level={4} style={{ margin: 0 }}>
                  {selectedManager?.name}
                </Title>
                <Tag
                  color={
                    selectedManager?.status === "pending"
                      ? "gold"
                      : selectedManager?.status === "approved"
                        ? "green"
                        : "red"
                  }
                >
                  {selectedManager?.status.toUpperCase()}
                </Tag>
              </div>
            </div>

            <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 12 }}>
              <Space orientation="vertical" size={12} style={{ width: "100%" }}>
                <div>
                  <Text type="secondary">Email</Text>
                  <div>
                    <MailOutlined
                      style={{ marginRight: 8, color: "#1890ff" }}
                    />
                    <Text>{selectedManager?.email}</Text>
                  </div>
                </div>
                <div>
                  <Text type="secondary">Phone</Text>
                  <div>
                    <PhoneOutlined
                      style={{ marginRight: 8, color: "#52c41a" }}
                    />
                    <Text>{selectedManager?.phone || "Not exist"}</Text>
                  </div>
                </div>
                <div>
                  <Text type="secondary">age</Text>
                  <div>
                    <Tag color="geekblue">{selectedManager?.age}</Tag>
                  </div>
                </div>
                <div>
                  <Text type="secondary">Role</Text>
                  <div>
                    <Text>{selectedManager?.role}</Text>
                  </div>
                </div>
                <div>
                  <Text type="secondary">Registered On</Text>
                  <div>
                    <Text>
                      {formatRegistrationDate(selectedManager?.createdAT)}
                    </Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                      {getTimeAgo(selectedManager?.createdAT)}
                    </Text>
                  </div>
                </div>
                <div>
                  <Text type="secondary">Status</Text>
                  <div
                    style={{
                      background: "#f5f5f5",
                      padding: 12,
                      borderRadius: 8,
                    }}
                  >
                    <Text>{selectedManager?.status}</Text>
                  </div>
                </div>
              </Space>
            </div>
          </Space>
        )}
      </Modal>
    </>
  );
};

export default ManagerModal;
