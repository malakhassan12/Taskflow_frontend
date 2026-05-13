import { Button, Space, Popconfirm, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import useCommentMutations from "../../../Hooks/Comment/useCommentMutations";
import EditCommentModal from "../../Modals/Comment/EditCommentModal";

const CommentBtns = ({ comment }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { editCommentMutation, deleteCommentMutation } = useCommentMutations(
    comment?.receiverId,
    comment?.senderId,
    comment?.taskId,
  );

  const handleEdit = (values) => {
    console.log(values)
    editCommentMutation.mutate(
      { commentId: comment?.id, data: { comment: values.comment } },
      {
        onSuccess: () => {
          setIsEditModalOpen(false);
        },
      }
    );
  };

  const handleDelete = () => {
    deleteCommentMutation?.mutate(comment?.id);
  };

  return (
    <>
      <EditCommentModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEdit={handleEdit}
        initialComment={comment?.comment}
        loading={editCommentMutation?.isPending}
      />

      <Space size="small">
        <Tooltip title="Edit comment">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => setIsEditModalOpen(true)}
            size="small"
            style={{ color: "#1677ff" }}
          />
        </Tooltip>

        <Popconfirm
          title="Delete comment"
          description="Are you sure you want to delete this comment?"
          onConfirm={handleDelete}
          okText="Yes"
          cancelText="No"
          okButtonProps={{ danger: true }}
        >
          <Tooltip title="Delete comment">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              danger
              size="small"
              loading={deleteCommentMutation?.isPending}
            />
          </Tooltip>
        </Popconfirm>
      </Space>
    </>
  );
};

export default CommentBtns;