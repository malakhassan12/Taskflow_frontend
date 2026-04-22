import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import {
  createProject,
  createTask,
  deleteProject,
  updateTask,
} from "../../Api/api/manager.api";
import { useAuth } from "../../Context/AuthContext";

const useManagerMutations = (projectId) => {
  const queryClient = useQueryClient();

  const { user } = useAuth();
  const createProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: (newProject) => {
      queryClient.setQueryData(
        ["managerProjects", user?.userId],
        (oldData = []) => [...oldData, newProject],
      );

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
      queryClient.refetchQueries({ queryKey: ["tasks", projectId] });
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
      queryClient.refetchQueries({ queryKey: ["tasks", projectId] });
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
