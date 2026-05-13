import { Tag, Button, Space, Badge, Typography, Tooltip, Avatar } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  TeamOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const ProjectsColumns = (
  handleViewProjectDetails,
  handleViewManagerDetails,
  handleApprove,
  handleReject,
  hasPendingProjects = false,
) => [
  {
    title: "Project ID",
    dataIndex: "id",
    key: "id",
    render: (id) => (
      <Typography.Text strong style={{ color: "#1890ff" }}>
        {id}
      </Typography.Text>
    ),
  },
  {
    title: "Project Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Project Manager",
    dataIndex: "projectManager",
    key: "projectManager",
    render: (manager, record) => (
      <Space>
        <Avatar
          size="small"
          icon={<UserOutlined />}
          style={{ backgroundColor: "#87d068" }}
        />
        <Typography.Text
          style={{
            cursor: hasPendingProjects ? "pointer" : "default",
            color: "#1890ff",
          }}
          onClick={() => {
            console.log(record?.manager);
            if (hasPendingProjects) handleViewManagerDetails(record?.manager);
          }}
        >
          {manager}
        </Typography.Text>
      </Space>
    ),
  },

  
  {
    title: "Submitted",
    dataIndex: "submittedDate",
    key: "submittedDate",
    render: (date) => (
      <Space>
        <CalendarOutlined style={{ color: "#faad14" }} />
        <Typography.Text type="secondary">{date}</Typography.Text>
      </Space>
    ),
  },
 {
  title: "Status",
  dataIndex: "status",
  key: "status",

  render: (status) => {

    let text = "Approved";
    let badgeStatus = "success";

    switch (status?.toUpperCase()) {

      case "PENDING":
        text = "Pending";
        badgeStatus = "warning";
        break;

      case "REJECTED":
        text = "Rejected";
        badgeStatus = "error";
        break;

      case "APPROVED":
        text = "Approved";
        badgeStatus = "success";
        break;

      case "COMPLETED":
        text = "Completed";
        badgeStatus = "processing";
        break;

      default:
        text = status;
        badgeStatus = "default";
    }

    return (
      <Badge
        status={badgeStatus}
        text={text}
      />
    );
  },
},
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => {
      console.log(record);
      return (
        <Space size="small">
          <Tooltip title="View Project Details">
            <Button
              icon={<EyeOutlined />}
              size="small"
              onClick={() => handleViewProjectDetails(record)}
              style={{ color: "#1890ff" }}
            />
          </Tooltip>

          {record?.status === "pending" && (
            <>
              <Tooltip title="Approve Project">
                <Button
                  icon={<CheckCircleOutlined />}
                  size="small"
                  onClick={() => {
                    console.log("Approving project:", record.id);
                    handleApprove(record.id);
                  }}
                  style={{ color: "#52c41a", borderColor: "#52c41a" }}
                  type="primary"
                  ghost
                >
                  Approve
                </Button>
              </Tooltip>

              <Tooltip title="Reject Project">
                <Button
                  icon={<CloseCircleOutlined />}
                  size="small"
                  onClick={() => {
                    console.log("Rejecting project:", record.id);
                    handleReject(record.id);
                  }}
                  danger
                >
                  Reject
                </Button>
              </Tooltip>
            </>
          )}
        </Space>
      );
    },
  },
];

export default ProjectsColumns;
