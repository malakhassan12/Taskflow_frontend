import React from "react";
import { Modal, Form, Input, Button, Space, Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Text } = Typography;

const EditCommentModal = ({ 
  open, 
  onClose, 
  onEdit, 
  initialComment = "", 
  loading = false 
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onEdit({ comment: values.comment });
      form.resetFields();
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={
        <Space>
          <EditOutlined style={{ color: "#1677ff" }} />
          <span>Edit Comment</span>
        </Space>
      }
      open={open}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
          loading={loading}
          style={{ backgroundColor: "#1677ff" }}
        >
          Save Changes
        </Button>,
      ]}
      width={500}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ comment: initialComment }}
      >
        <div style={{ padding: "8px 0" }}>
          <Text type="secondary" style={{ marginBottom: 8, display: "block" }}>
            Edit your comment below:
          </Text>
          <Form.Item
            name="comment"
            rules={[
              { required: true, message: "Please enter a comment" },
              { min: 1, message: "Comment cannot be empty" },
              { max: 500, message: "Comment cannot exceed 500 characters" }
            ]}
            noStyle
          >
            <TextArea
              rows={4}
              placeholder="Write your comment..."
              maxLength={500}
              showCount
              style={{ resize: "none" }}
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default EditCommentModal;