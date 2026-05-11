import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { approveTask, deleteTask, rejectTask } from "../../Api/api/task.api";

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
    mutationFn: approveTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      queryClient.invalidateQueries({ queryKey: ["task"] });

      message.success("Task approved successfully!");
    },
    onError: (err) => {
      message.error(err?.message || "Failed to approve  Task");
    },
  });

  const rejectTaskMutation = useMutation({
    mutationFn: rejectTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      queryClient.invalidateQueries({ queryKey: ["task"] });

      message.success("Task reject successfully!");
    },
    onError: (err) => {
      message.error(err?.message || "Failed to reject  Task");
    },
  });

  return {
    deleteTaskMutation,
    approveTaskMutation,
    rejectTaskMutation,
  };
};

export default useTaskMutations;
