import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { deleteTask } from "../../Api/api/task.api";

const useTaskMutations = () => {
  const queryClient = useQueryClient();

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      message.success("Task deleted successfully!");
    },
    onError: (err) => {
      message.error(err?.message || "Failed to deleted  Task");
    },
  });

  return {
    deleteTaskMutation,
  };
};

export default useTaskMutations;
