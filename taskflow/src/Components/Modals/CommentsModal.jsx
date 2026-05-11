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
      senderId: managerId,  // The current user is the sender
      receiverId: memberId,  // The other party is the receiver
    });
    setNewComment("");
  };

  // Helper function to determine if comment belongs to current user
  const isCurrentUserComment = (comment) => {
    return comment.senderId === user?.userId || comment.receiverId === user?.userId;
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
      return allComments.filter((c) => 
        c.senderId === user?.userId 
      );
    }
    return allComments;
  };

  const tabItems = [
    { key: "all", label: `All (${allComments.length})` },
    {
      key: "mine",
      label: `Mine (${allComments.filter((c) => 
        c.senderId === user?.userId 
      ).length})`,
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
              const isOwn = isCurrentUserComment(comment);
              return (
                <div
                  key={comment.id}
                  style={{
                    padding: "12px",
                    marginBottom: "12px",
                    borderRadius: "8px",
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
                      <Text strong>{getCommentDisplayName(comment)}</Text>
                      <Tag
                        color={isOwn ? (isManager ? "blue" : "green") : "default"}
                        style={{ margin: 0 }}
                      >
                        {getCommentUserRole(comment)}
                      </Tag>
                      <Text type="secondary" style={{ fontSize: 11 }}>
                        <ClockCircleOutlined />{" "}
                        {comment.createdAt !== "0001-01-01T00:00:00" 
                          ? dayjs(comment.createdAt).format("MM-DD HH:mm")
                          : "Just now"}
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
