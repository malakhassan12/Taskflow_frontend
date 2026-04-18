import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveManager, rejectManager } from "../../Api/api/admin.api";
import { message } from "antd";

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
    }
  });

  const rejectManagerMutation = useMutation({
    mutationFn: rejectManager,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingRequests"] });
      message.success("Manager rejected successfully!");
    },
    onError: (err) => {
      message.error(err?.message || "Failed to reject manager");
    }
  });

  return {
    approveManagerMutation,
    rejectManagerMutation
  };
};

export default useAdminMutations;