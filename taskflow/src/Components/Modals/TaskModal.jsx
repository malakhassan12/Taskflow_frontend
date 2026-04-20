// ==================== Ant Design ====================

import { Modal, Input, DatePicker, Form } from "antd";
import dayjs from "dayjs";
import useManagerMutations from "../../Hooks/Manager/useManagerMutations";
import SelectManager from "../FormComponents/Manager/SelectManager";

const { TextArea } = Input;

const TaskModal = ({
  isTaskModalOpen,
  setIsTaskModalOpen,
  task = {},
  projectId = null,
}) => {
  const { createTaskMutation, updateTaskMuatation } = useManagerMutations();
  const [form] = Form.useForm();
  console.log(form);
  console.log(task);

  // Will split later
  const handleSaveTask = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Validation passed:", values); // Add this log
        if (task && Object.keys(task).length !== 0) {
          // Update Task
          const finalTask = {
            ...values,
            id: task?.id,
          };

          console.log(finalTask)
          updateTaskMuatation.mutate(finalTask);
          form.resetFields();
          setIsTaskModalOpen(false);

          console.log(values);
        } else {
          // Make task

          const finalTask = {
            ...values,
            projectID: projectId,
          };
          createTaskMutation.mutate(finalTask);

          form.resetFields();
          setIsTaskModalOpen(false);

          console.log(values);
        }
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo); // Add this log
      });
  };
  return (
    <Modal
      title={
        task && Object.keys(task).length !== 0 ? "Edit Task" : "Add New Task"
      }
      open={isTaskModalOpen}
      onOk={handleSaveTask}
      onCancel={() => {
        if (!createTaskMutation.isPending) {
          setIsTaskModalOpen(false);
          form.resetFields();
        }
      }}
      okText={
        task && Object.keys(task).length !== 0 ? "Edit Task" : "Add New Task"
      }
      cancelText="Cancel"
      width={600}
      confirmLoading={
        createTaskMutation.isPending || updateTaskMuatation.isPending
      } // This disables OK button and shows loading
      cancelButtonProps={{
        disabled: createTaskMutation.isPending || updateTaskMuatation.isPending,
      }} // Disable cancel button
      closable={!createTaskMutation.isPending || !updateTaskMuatation.isPending} // Prevent closing by X button
      maskClosable={
        !createTaskMutation.isPending || !updateTaskMuatation.isPending
      } // Prevent closing by clicking outside
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          title: task?.title || "",
          description: task?.description || "Not exist",
          dueTime: task?.dueTime ? dayjs(task?.dueTime) : dayjs(), // Convert to dayjs
          priority: task?.priority,
          assignedMemberId: task?.assignedMemberId,
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

        {/* Integrated SelectManager component */}
        <SelectManager />

        <Form.Item
          name="dueTime"
          label="Due Time"
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
