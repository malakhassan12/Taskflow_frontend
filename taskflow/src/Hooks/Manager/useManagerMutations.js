import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import {
  createProject,
  createTask,
  deleteProject,
  updateTask,
} from "../../Api/api/manager.api";
import { useAuth } from "../../Context/AuthContext";

const useManagerMutations = (memberId, projectId) => {
  const queryClient = useQueryClient();

  console.log(memberId, projectId);

  const { user } = useAuth();
  const createProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: (newProject) => {
      queryClient.setQueryData(
        ["managerProjects", user?.userId],
        (oldData = []) => [...oldData, newProject],
      );

      queryClient.invalidateQueries({ queryKey: ["managerProjects", user?.userId] });
      message.success("Project created successfully!");
    },
    onError: (err) => {
      message.error(err?.message || "Failed to create  project");
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(
        ["managerProjects", user?.userId],
        (oldData = []) => oldData.filter((p) => p.id !== deletedId),
      );
      queryClient.invalidateQueries({ queryKey: ["managerProjects", user?.userId] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      queryClient.invalidateQueries({ queryKey: ["task"] });

      message.success("Project deleted successfully!");
    },
    onError: (err) => {
      message.error(err?.message || "Failed to deleted  project");
    },
  });

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      /// Comment here !!!
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      queryClient.invalidateQueries({ queryKey: ["task"] });
      message.success("Task Created successfully!");
    },
    onError: (err) => {
      message.error(err?.message || "Failed to Create  Task");
    },
  });

  const updateTaskMuatation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      /// Comment here !!!
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      queryClient.invalidateQueries({ queryKey: ["task"] });
      message.success("Task Update successfully!");
    },
    onError: (err) => {
      message.error(err?.message || "Failed to Update  Task");
    },
  });

  return {
    createProjectMutation,
    deleteProjectMutation,
    createTaskMutation,
    updateTaskMuatation,
  };
};

export default useManagerMutations;
