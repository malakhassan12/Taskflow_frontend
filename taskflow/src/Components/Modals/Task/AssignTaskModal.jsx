import React, { useState } from "react";
import {
  Button,
  Tooltip,
  Modal,
  Select,
  Space,
  Typography,
  Avatar,
  Tag,
  Divider,
  Alert,
  message,
} from "antd";
import {
  UserAddOutlined,
  TeamOutlined,
  UserOutlined,
  CheckCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import useGetAllMembersPerProject from "../../../Hooks/Manager/useGetAllMembersPerProject";
import { useParams } from "react-router-dom";
import useTaskMutations from "../../../Hooks/Task/useTaskMutations";

const { Option } = Select;
const { Text, Title } = Typography;

const AssignTaskModal = ({ isModalOpen, setIsModalOpen, task }) => {
  const isAssigned = task?.assignedMemberId !== null;
  const { projectId } = useParams();
  const { data: projectMembers = [] } = useGetAllMembersPerProject(projectId);

  console.log("Project Members:", projectMembers);

  const [selectedMember, setSelectedMember] = useState(null);
  const { assignTaskMutation } = useTaskMutations();

  const currentAssignee = projectMembers?.find(
    (m) => m.id === task?.assignedMemberId,
  );

  const handleAssign = () => {
    if (!selectedMember) {
      message.warning("Please select a team member");
      return;
    }

    assignTaskMutation.mutate(
      {
        taskId: task?.id,
        userId: selectedMember,
      },
      {
        onSuccess: () => {
          setIsModalOpen(false);
          setSelectedMember(null);
        },
      },
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  const getMemberName = (member) => {
    if (!member) return "";
    return member.name || member.firstName || member.lastName
      ? `${member.firstName || ""} ${member.lastName || ""}`.trim()
      : "Unknown";
  };

  //   const getMemberEmail = (member) => {
  //     return member.email || "No email";
  //   };

  // FIXED: Get member avatar initial
  const getMemberInitial = (member) => {
    const name = getMemberName(member);
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <Modal
      title={
        <Space>
          <UserAddOutlined style={{ color: "#1677ff", fontSize: 20 }} />
          <span>Assign Task</span>
        </Space>
      }
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="assign"
          type="primary"
          onClick={handleAssign}
          loading={assignTaskMutation?.isPending}
          disabled={!selectedMember}
          icon={<CheckCircleOutlined />}
        >
          Assign Task
        </Button>,
      ]}
      width={520}
      style={{ top: 20 }}
    >
      <div style={{ padding: "8px 0" }}>
        {/* Task Information */}
        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "16px",
            borderRadius: "8px",
            marginBottom: "20px",
            color: "white",
          }}
        >
          <Space direction="vertical" size={8} style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }}>
                Task ID: #{task?.id}
              </Text>
              <Tag
                color={
                  task?.priority === 3
                    ? "red"
                    : task?.priority === 2
                      ? "orange"
                      : "green"
                }
              >
                {task?.priority === 3
                  ? "High Priority"
                  : task?.priority === 2
                    ? "Medium Priority"
                    : "Low Priority"}
              </Tag>
            </div>
            <Title level={5} style={{ margin: 0, color: "white" }}>
              {task?.title}
            </Title>
            {task?.discription && task?.discription !== "Not exist" && (
              <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 13 }}>
                {task?.discription}
              </Text>
            )}
          </Space>
        </div>

        {/* Current Assignment Info */}
        {isAssigned && currentAssignee && (
          <>
            <Alert
              message="Currently Assigned"
              description={
                <Space>
                  <Avatar size="small" style={{ backgroundColor: "#52c41a" }}>
                    {getMemberInitial(currentAssignee)}
                  </Avatar>
                  <Text strong>{getMemberName(currentAssignee)}</Text>
                  <Tag color="blue">Current Assignee</Tag>
                </Space>
              }
              type="warning"
              showIcon
              icon={<WarningOutlined />}
              style={{ marginBottom: "20px", borderRadius: "8px" }}
            />
            <Text
              type="secondary"
              style={{ display: "block", marginBottom: "8px", fontSize: 12 }}
            >
              Re-assigning will change the task owner
            </Text>
          </>
        )}

        {/* Assign to New Member */}
        <div style={{ marginTop: isAssigned ? 8 : 0 }}>
          <Text strong style={{ display: "block", marginBottom: "12px" }}>
            <TeamOutlined /> Select Team Member
          </Text>

          <Select
            placeholder="Choose a team member to assign"
            style={{ width: "100%" }}
            onChange={(value) => setSelectedMember(value)}
            value={selectedMember}
            size="large"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => {
              const memberName = option?.props?.memberName || "";
              return memberName.toLowerCase().includes(input.toLowerCase());
            }}
          >
            {projectMembers.map((member) => (
              <Option
                key={member.id}
                value={member.id}
                memberName={getMemberName(member)}
              >
                <Space>
                  <Avatar
                    size="small"
                    style={{
                      backgroundColor:
                        member.id === task?.assignedMemberId
                          ? "#52c41a"
                          : "#1677ff",
                    }}
                  >
                    {getMemberInitial(member)}
                  </Avatar>
                  <div>
                    <div>
                      {getMemberName(member)}
                      {member.id === task?.assignedMemberId && (
                        <Tag
                          color="green"
                          style={{ marginLeft: 8, fontSize: 10 }}
                        >
                          Current
                        </Tag>
                      )}
                    </div>
                    <Text type="secondary" style={{ fontSize: 11 }}>
                      {/* {getMemberEmail(member)} */}
                      {member?.name}
                    </Text>
                  </div>
                </Space>
              </Option>
            ))}
          </Select>

          {projectMembers.length === 0 && (
            <Alert
              message="No team members available"
              description="Please add team members to this project before assigning tasks."
              type="error"
              showIcon
              style={{ marginTop: 12, borderRadius: 8 }}
            />
          )}
        </div>

        <Divider style={{ margin: "16px 0 8px" }} />

        {/* Info Text */}
        <Text
          type="secondary"
          style={{ fontSize: 12, display: "block", textAlign: "center" }}
        >
          The assigned member will be notified about this task
        </Text>
      </div>
    </Modal>
  );
};

export default AssignTaskModal;
