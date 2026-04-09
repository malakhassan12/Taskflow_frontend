// ==================== Ant Design ====================

import { Form } from "antd";
import { Modal, Input, DatePicker } from "antd";
import dayjs from "dayjs";

const { TextArea } = Input;

const TaskModal = ({
  isTaskModalOpen,
  setIsTaskModalOpen,
  task,
  handleSaveTask,
  form,
}) => {
  console.log(form)
  console.log(task);

  return (
    <Modal
      title={task ? "Edit Task" : "Add New Task"}
      open={isTaskModalOpen}
      onOk={handleSaveTask}
      onCancel={() => {
        setIsTaskModalOpen(false);
        form.resetFields();
      }}
      okText="Save"
      cancelText="Cancel"
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          title: "",
          description: "",
          dueDate: dayjs(),
          priority: 0,
        }}
      >
        <Form.Item
          name="title"
          label="Task Title"
          rules={[{ required: true, message: "Please enter task title" }]}
        >
          <Input placeholder="Enter task title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter task description" }]}
        >
          <TextArea rows={4} placeholder="Enter task description" />
        </Form.Item>

        <Form.Item
          name="dueDate"
          label="Due Date"
          rules={[{ required: true, message: "Please select due date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="priority"
          label="Priority"
          rules={[{ required: true, message: "Please enter priority" }]}
        >
          <Input type="number" placeholder="Enter task priority" min={0} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskModal;
