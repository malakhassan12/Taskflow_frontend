import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveManager, rejectManager } from "../../Api/api/admin.api";
import { message } from "antd";
import { updateProjectStatus } from "../../Api/api/manager.api";

const useAdminMutations = () => {
  const queryClient = useQueryClient();

  const approveManagerMutation = useMutation({
    mutationFn: approveManager,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingRequests"] });
      message.success("Manager approved successfully!");
    },
    onError: (err) => {
      message.error(err?.message || "Failed to approve manager");
    },
  });

  const rejectManagerMutation = useMutation({
    mutationFn: rejectManager,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingRequests"] });
      message.success("Manager rejected successfully!");
    },
    onError: (err) => {
      message.error(err?.message || "Failed to reject manager");
    },
  });

  const approveProjectMutation = useMutation({
    mutationFn: updateProjectStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pendingRequests"],
      });
      message.success("Project rejected successfully!");
    },
    onError: (err) => {
      message.error(err?.message || "Failed to reject Project");
    },
  });

  const rejectProjectMutation = useMutation({
    mutationFn: updateProjectStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pendingRequests"],
      });
      message.success("Project rejected successfully!");
    },
    onError: (err) => {
      message.error(err?.message || "Failed to reject Project");
    },
  });

  return {
    approveManagerMutation,
    rejectManagerMutation,
    approveProjectMutation,
    rejectProjectMutation,
  };
};

export default useAdminMutations;
