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
import CommentBtns from "../Buttons/Comment/CommentBtns";

const { TextArea } = Input;
const { Text } = Typography;

const CommentsModal = ({ open, setOpen, memberId, taskId }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { user } = useAuth();
  const [newComment, setNewComment] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const managerId = user?.userId;

  // Get all comments for this task
  const { data: allComments = [], isLoading } = useGetCommentsById(
    memberId,
    managerId,
    taskId,
  );

  const { pushCommentMutation } = useCommentMutations(
    memberId,
    managerId,
    taskId,
  );

  const isManager = user?.role === "ProjectManager";
  const currentUserColor = isManager ? primaryColor : green;

  const handleSendComment = () => {
    if (!newComment.trim()) {
      messageApi.warning("Please enter a comment");
      return;
    }

    pushCommentMutation.mutate({
      comment: newComment,
      taskId: taskId,
      senderId: managerId, // The current user is the sender
      receiverId: memberId, // The other party is the receiver
    });
    setNewComment("");
  };

  // Helper function to determine if comment belongs to current user
  const isCurrentUserComment = (comment) => {
    return (
      comment.senderId === user?.userId || comment.receiverId === user?.userId
    );
  };

  // Helper function to get the display name for a comment
  const getCommentDisplayName = (comment) => {
    const isSender = comment.senderId === user?.userId;

    if (isSender) {
      return "You";
    }

    // If it's not from current user, determine the role based on who they are
    const isCommentFromManager = comment.senderId === managerId;
    return isCommentFromManager ? "Manager" : "Team Member";
  };

  // Helper function to get comment's user role
  const getCommentUserRole = (comment) => {
    const isSender = comment.senderId === user?.userId;

    if (isSender) {
      return isManager ? "Manager" : "Member";
    }

    // For others' comments
    const isCommentFromManager = comment.senderId === managerId;
    return isCommentFromManager ? "Manager" : "Member";
  };

  const getFilteredComments = () => {
    if (activeTab === "mine") {
      // Filter comments where current user is either sender or receiver
      return allComments.filter((c) => c.senderId === user?.userId);
    }
    return allComments;
  };

  const tabItems = [
    { key: "all", label: `All (${allComments.length})` },
    {
      key: "mine",
      label: `Mine (${
        allComments.filter((c) => c.senderId === user?.userId).length
      })`,
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

      <style>
        {`
          .no-color-scroll::-webkit-scrollbar {
            width: 8px;
          }
          .no-color-scroll::-webkit-scrollbar-track {
            background: transparent;
          }
          .no-color-scroll::-webkit-scrollbar-thumb {
            background: #d9d9d9; 
            border-radius: 10px;
          }
          .no-color-scroll::-webkit-scrollbar-thumb:hover {
            background: #bfbfbf;
          }
          /* For Firefox */
          .no-color-scroll {
            scrollbar-width: thin;
            scrollbar-color: #d9d9d9 transparent;
          }
        `}
      </style>
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
      <div
        style={{ maxHeight: 400, overflowY: "auto" }}
        className="no-color-scroll"
      >
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
              const isOwn = isCurrentUserComment(comment);
              return (
                <div
                  key={comment.id}
                  style={{
                    padding: "16px",
                    marginBottom: "16px",
                    borderRadius: "12px",
                    border: `1px solid ${isOwn ? primaryColor : "#e8e8e8"}`,
                    borderLeft: `4px solid ${isOwn ? primaryColor : "#d9d9d9"}`,
                    transition: "all 0.3s ease",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "12px",
                    }}
                  >
                    {/* Left side - Comment content */}
                    <div style={{ flex: 1 }}>
                      <Space
                        direction="vertical"
                        size={8}
                        style={{ width: "100%" }}
                      >
                        {/* Header with user info */}
                        <Space wrap align="center" size={8}>
                          <Avatar
                            size={32}
                            icon={<UserOutlined />}
                            style={{
                              backgroundColor: isOwn ? primaryColor : "#8c8c8c",
                              flexShrink: 0,
                            }}
                          />
                          <Text strong style={{ fontSize: "14px" }}>
                            {getCommentDisplayName(comment)}
                          </Text>
                          <Tag
                            color={
                              isOwn ? (isManager ? "blue" : "green") : "default"
                            }
                            style={{
                              margin: 0,
                              borderRadius: "4px",
                              fontSize: "11px",
                              padding: "0 6px",
                            }}
                          >
                            {getCommentUserRole(comment)}
                          </Tag>
                          <Text type="secondary" style={{ fontSize: "11px" }}>
                            <ClockCircleOutlined
                              style={{ marginRight: "4px" }}
                            />
                            {comment.createdAt !== "0001-01-01T00:00:00"
                              ? dayjs(comment.createdAt).format("MM-DD HH:mm")
                              : "Just now"}
                          </Text>
                        </Space>

                        {/* Comment text */}
                        <div style={{ paddingLeft: "40px" }}>
                          <Text
                            style={{
                              fontSize: "14px",
                              lineHeight: "1.5",
                              wordBreak: "break-word",
                            }}
                          >
                            {comment.comment}
                          </Text>
                        </div>
                      </Space>
                    </div>
                    {user?.userId == comment.senderId && (
                      <div style={{ flexShrink: 0 }}>
                        <CommentBtns
                          comment={comment}
                          isAuthor={comment.senderId === user?.userId}
                        />
                      </div>
                    )}
                  </div>
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
