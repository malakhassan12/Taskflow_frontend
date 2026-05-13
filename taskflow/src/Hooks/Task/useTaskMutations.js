import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import {
  approveTask,
  assignTask,
  deleteTask,
  rejectTask,
} from "../../Api/api/task.api";

const useTaskMutations = () => {
  const queryClient = useQueryClient();

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      queryClient.invalidateQueries({ queryKey: ["task"] });

      message.success("Task deleted successfully!");
    },
    onError: (err) => {
      message.error(err?.message || "Failed to deleted  Task");
    },
  });

  const approveTaskMutation = useMutation({
    mutationFn: ({ taskId, userId }) => approveTask(taskId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      queryClient.invalidateQueries({ queryKey: ["task"] });

      queryClient.invalidateQueries({ queryKey: ["notifications"] });

      message.success("Task approved successfully!");
    },
    onError: (err) => {
      message.error(err?.message || "Failed to approve  Task");
    },
  });

  const rejectTaskMutation = useMutation({
    mutationFn: ({ taskId, userId }) => rejectTask(taskId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      queryClient.invalidateQueries({ queryKey: ["task"] });

      queryClient.invalidateQueries({ queryKey: ["notifications"] });

      message.success("Task reject successfully!");
    },
    onError: (err) => {
      message.error(err?.message || "Failed to reject  Task");
    },
  });

  const assignTaskMutation = useMutation({
    mutationFn: assignTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      queryClient.invalidateQueries({ queryKey: ["task"] });

      message.success("Task assigned successfully!");
    },
    onError: (err) => {
      message.error(err?.message || "Failed to assigned  Task");
    },
  });

  return {
    deleteTaskMutation,
    approveTaskMutation,
    rejectTaskMutation,
    assignTaskMutation,
  };
};

export default useTaskMutations;
