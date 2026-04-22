import { useState } from "react";
// ==================== Ant Design ====================
import {
  Modal,
  Input,
  Button,
  Avatar,
  Space,
  Tabs,
  message,
  Typography,
  Tag,
  Empty,
  Spin,
  List,
} from "antd";
import {
  SendOutlined,
  MessageOutlined,
  UserOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
// ==================== Constants ====================
import { green, primaryColor } from "../../Constants/Colors";
// ==================== Hooks ====================
import { useAuth } from "../../Context/AuthContext";
import useGetCommentsById from "../../Hooks/Comment/useGetCommentsById";
import useCommentMutations from "../../Hooks/Comment/useCommentMutations";

const { TextArea } = Input;
const { Text } = Typography;

const CommentsModal = ({ open, setOpen, memberId, taskId }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { user } = useAuth();
  const [newComment, setNewComment] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  console.log(memberId);
  const managerId = user?.userId;
  // Get all comments for this task
  const { data: allComments = [], isLoading } = useGetCommentsById(
    managerId,
    memberId,
  );

  console.log(allComments);
  const { pushCommentMutation } = useCommentMutations();

  const isManager = user?.role === "projectmanager";
  const currentUserColor = isManager ? primaryColor : green;

  const handleSendComment = () => {
    if (!newComment.trim()) {
      messageApi.warning("Please enter a comment");
      return;
    }

    console.log({
      comment: newComment,
      taskId: taskId,
      senderId: memberId,
      receiverId: managerId,
    });
    pushCommentMutation.mutate({
      comment: newComment,
      taskId: taskId,
      senderId: memberId,
      receiverId: managerId,
    });
  };

  const getFilteredComments = () => {
    if (activeTab === "mine") {
      return allComments.filter((c) => c.userId === user?.userId);
    }
    return allComments;
  };

  const tabItems = [
    { key: "all", label: `All (${allComments.length})` },
    {
      key: "mine",
      label: `Mine (${allComments.filter((c) => c.userId === user?.userId).length})`,
    },
  ];

  return (
    <Modal
      title={
        <Space>
          <MessageOutlined />
          <span>Comments</span>
        </Space>
      }
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width={600}
    >
      {contextHolder}

      {/* Input Area */}
      <div style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: "100%" }} size={12}>
          <Space>
            <Avatar
              icon={<UserOutlined />}
              style={{ backgroundColor: currentUserColor }}
            />
            <Text strong>{user?.name || "You"}</Text>
            <Tag color={isManager ? "blue" : "green"}>
              {isManager ? "Manager" : "Member"}
            </Tag>
          </Space>
          <TextArea
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSendComment}
            loading={pushCommentMutation?.isPending}
            block
          >
            Send
          </Button>
        </Space>
      </div>

      {/* Tabs */}
      <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />

      {/* Comments List */}
      <div style={{ maxHeight: 400, overflowY: "auto" }}>
        {isLoading ? (
          <div style={{ textAlign: "center", padding: 40 }}>
            <Spin />
          </div>
        ) : getFilteredComments().length === 0 ? (
          <Empty
            description="No comments yet"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <List
            dataSource={getFilteredComments()}
            renderItem={(comment) => {
              const isOwn = comment.userId === user?.userId;
              return (
                <div
                  style={{
                    padding: "12px",
                    marginBottom: "12px",
                    borderRadius: "8px",
                    backgroundColor: isOwn ? "#f0f7ff" : "#fafafa",
                    borderLeft: `3px solid ${isOwn ? primaryColor : "#d9d9d9"}`,
                  }}
                >
                  <Space
                    direction="vertical"
                    size={4}
                    style={{ width: "100%" }}
                  >
                    <Space wrap>
                      <Avatar size="small" icon={<UserOutlined />} />
                      <Text strong>{isOwn ? "You" : "Team Member"}</Text>
                      <Tag
                        color={isOwn ? "blue" : "green"}
                        style={{ margin: 0 }}
                      >
                        {isOwn ? (isManager ? "Manager" : "Member") : "Member"}
                      </Tag>
                      <Text type="secondary" style={{ fontSize: 11 }}>
                        <ClockCircleOutlined />{" "}
                        {dayjs(comment.createdAt).format("MM-DD HH:mm")}
                      </Text>
                    </Space>
                    <Text style={{ marginLeft: 32 }}>{comment.comment}</Text>
                  </Space>
                </div>
              );
            }}
          />
        )}
      </div>
    </Modal>
  );
};

export default CommentsModal;
