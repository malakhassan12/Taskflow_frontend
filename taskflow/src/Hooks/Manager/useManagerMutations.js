import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { createProject, deleteProject } from "../../Api/api/manager.api";

const useManagerMutations = () => {
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

  return {
    createProjectMutation,
    deleteProjectMutation,
  };
};

export default useManagerMutations;
