import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

import {
  deleteComment,
  editComment,
  pushComment,
} from "../../Api/api/comment.api";

const useCommentMutations = () => {
  const queryClient = useQueryClient();

  const pushCommentMutation = useMutation({
    mutationFn: pushComment,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["comments"] });

      message.success("Comment created successfully!");
    },
    onError: (err) => {
      message.error(err?.message || "Faild to create  Comment");
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["comments"] });

      message.success("comment deleted successfully!");
    },
    onError: (err) => {
      message.error(err?.message || "Faild to deleted  Commet");
    },
  });

  const editCommentMuatation = useMutation({
    mutationFn: editComment,
    onSuccess: () => {
      /// Comment here !!!
      queryClient.refetchQueries({ queryKey: ["comments"] });

      message.success("comment Update successfully!");
    },
    onError: (err) => {
      message.error(err?.message || "Faild to Update  Comment");
    },
  });

  return {
    pushCommentMutation,
    deleteCommentMutation,
    editCommentMuatation,
  };
};

export default useCommentMutations;
