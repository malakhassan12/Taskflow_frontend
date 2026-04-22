import { useParams } from "react-router-dom";
import {
  Card,
  Descriptions,
  Tag,
  Space,
  Typography,
  Grid,
  Spin,
  Alert,
  Button,
  Modal,
  Avatar,
  Divider,
  Row,
  Col,
} from "antd";
import BackBtn from "../../Components/Buttons/BackBtn";
import useGetTask from "../../Hooks/Task/useGetTask";
import DeleteTaskBtn from "../../Components/Buttons/Task/DeleteTaskBtn";
import useGetTaskStatus from "../../Hooks/Task/useGetTaskStatus";
import getTaskStatusColor from "../../Utils/StatusOfTasks/getTaskStatusColor";
import DataError from "../../Components/Error/DataError";
import DataLoad from "../../Components/Loaders/DataLoad";
import useGetMember from "../../Hooks/Manager/useGetMember";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const TaskDetails = () => {
  const { taskId, projectId } = useParams();
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const { data: task = {}, isLoading } = useGetTask(taskId);
  const { data: stat } = useGetTaskStatus(taskId, projectId);



  const memberId = task?.assignedMemberId;


  const { data: member } = useGetMember(memberId, {
    enabled: !!memberId,
  });


  console.log(member)

  if (isLoading) {
    return <DataLoad />;
  }

  if (!task) {
    return <DataError />;
  }

  const priorityConfig = {
    1: { color: "#52c41a", text: "Low", bg: "#f6ffed" },
    2: { color: "#1890ff", text: "Medium", bg: "#e6f7ff" },
    3: { color: "#faad14", text: "High", bg: "#fffbe6" },
    4: { color: "#ff4d4f", text: "Urgent", bg: "#fff2f0" },
  };

  const priority = priorityConfig[task.priority] || priorityConfig[1];
  const statusColor = getTaskStatusColor[task.status] || "default";
  const approvalStatus = stat?.statusApproval?.[0] || "PENDING";
  const isOverdue = task.dueTime && new Date(task.dueTime) < new Date();

  return (
    <div
      style={{ maxWidth: 900, margin: "0 auto", padding: isMobile ? 16 : 24 }}
    >
      {/* Header Actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <BackBtn />
        <DeleteTaskBtn id={task?.id} />
      </div>

      {/* Main Card */}
      <Card
        style={{
          borderRadius: 16,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          border: "1px solid #f0f0f0",
        }}
        styles={{ body: { padding: isMobile ? 20 : 28 } }}
      >
        {/* Title Section */}
        <div style={{ marginBottom: 24 }}>
          <Title
            level={2}
            style={{ margin: 0, marginBottom: 12, fontWeight: 600 }}
          >
            {task.title}
          </Title>
          <Space size={12} wrap>
            <Tag
              color={priority.color}
              style={{ borderRadius: 4, padding: "4px 12px" }}
            >
              {priority.text} Priority
            </Tag>
            <Tag
              color={statusColor}
              style={{ borderRadius: 4, padding: "4px 12px" }}
            >
              {task.status || "Todo"}
            </Tag>
            {approvalStatus === "APPROVED" ? (
              <Tag
                color="success"
                style={{ borderRadius: 4, padding: "4px 12px" }}
              >
                Approved
              </Tag>
            ) : (
              <Tag
                color="warning"
                style={{ borderRadius: 4, padding: "4px 12px" }}
              >
                Pending Approval
              </Tag>
            )}
            {isOverdue && (
              <Tag
                color="error"
                style={{ borderRadius: 4, padding: "4px 12px" }}
              >
                Overdue
              </Tag>
            )}
          </Space>
        </div>

        <Divider style={{ margin: "16px 0" }} />

        {/* Description Section */}
        <div style={{ marginBottom: 24 }}>
          <Text
            strong
            style={{ display: "block", marginBottom: 8, fontSize: 14 }}
          >
            Description
          </Text>
          <Text type="secondary" style={{ fontSize: 14, lineHeight: 1.6 }}>
            {task.discription || "No description provided"}
          </Text>
        </div>

        <Divider style={{ margin: "16px 0" }} />

        {/* Details Grid */}
        <Row gutter={[24, 20]}>
          <Col xs={24} sm={12}>
            <div>
              <Text
                type="secondary"
                style={{ fontSize: 12, display: "block", marginBottom: 4 }}
              >
                Priority Level
              </Text>
              <Text strong style={{ fontSize: 14 }}>
                {priority.text} (Level {task.priority})
              </Text>
            </div>
          </Col>

          <Col xs={24} sm={12}>
            <div>
              <Text
                type="secondary"
                style={{ fontSize: 12, display: "block", marginBottom: 4 }}
              >
                Status
              </Text>
              <Text
                strong
                style={{ fontSize: 14, textTransform: "capitalize" }}
              >
                {task.status || "Todo"}
              </Text>
            </div>
          </Col>

          <Col xs={24} sm={12}>
            <div>
              <Text
                type="secondary"
                style={{ fontSize: 12, display: "block", marginBottom: 4 }}
              >
                Due Date
              </Text>
              <Text
                strong
                style={{
                  fontSize: 14,
                  color: isOverdue ? "#ff4d4f" : "inherit",
                }}
              >
                {new Date(task.dueTime).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {isOverdue && " (Overdue)"}
              </Text>
            </div>
          </Col>

          <Col xs={24} sm={12}>
            <div>
              <Text
                type="secondary"
                style={{ fontSize: 12, display: "block", marginBottom: 4 }}
              >
                Project ID
              </Text>
              <Text strong style={{ fontSize: 14 }}>
                #{task.projectID}
              </Text>
            </div>
          </Col>

          <Col xs={24} sm={12}>
            <div>
              <Text
                type="secondary"
                style={{ fontSize: 12, display: "block", marginBottom: 4 }}
              >
                Task ID
              </Text>
              <Text strong style={{ fontSize: 14 }}>
                #{task.id}
              </Text>
            </div>
          </Col>

          <Col xs={24} sm={12}>
            <div>
              <Text
                type="secondary"
                style={{ fontSize: 12, display: "block", marginBottom: 4 }}
              >
                Approval Status
              </Text>
              <Text strong style={{ fontSize: 14 }}>
                {approvalStatus === "APPROVED" ? "✓ Approved" : "⏳ Pending"}
              </Text>
            </div>
          </Col>

          <Col xs={24}>
            <div>
              <Text
                type="secondary"
                style={{ fontSize: 12, display: "block", marginBottom: 4 }}
              >
                Assigned To
              </Text>
              <Space>
                <Avatar size="small" style={{ backgroundColor: "#1890ff" }}>
                  {member?.email?.charAt(0) || "U"}
                </Avatar>
                <Text strong style={{ fontSize: 14 }}>
                  {member?.email || "Unassigned"}
                </Text>
                {task.assignedMember?.role && (
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    ({member?.role})
                  </Text>
                )}
              </Space>
            </div>
          </Col>
        </Row>

        {/* Created At (if available) */}
        {task.createdAt && (
          <>
            <Divider style={{ margin: "20px 0 16px 0" }} />
            <div>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Created on {new Date(task.createdAt).toLocaleDateString()} at{" "}
                {new Date(task.createdAt).toLocaleTimeString()}
              </Text>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default TaskDetails;
