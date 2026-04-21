import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import {
  createProject,
  createTask,
  deleteProject,
  updateTask,
} from "../../Api/api/manager.api";

const useManagerMutations = (projectId) => {
  const queryClient = useQueryClient();

  const createProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["managerProjects"] });

      message.success("Project created successfully!");
    },
    onError: (err) => {
      message.error(err?.message || "Failed to create  project");
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["managerProjects"] });

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
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });

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
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });

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
