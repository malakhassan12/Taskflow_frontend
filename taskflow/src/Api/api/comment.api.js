import commentClient from "../client/comment.client";
import { createNotification } from "./notification.api";

const getCommentsById = async (memberId, managerId, taskid) => {
  try {
    const res = await commentClient.get(`/ById`, {
      params: { SenderId: managerId, ReciverID: memberId, TaskId: taskid },
    });
    console.log(res);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

// Update in the Back
const pushComment = async (data) => {
  try {
    const res = await commentClient.post("", data);
    console.log(res);

    // Create notification for the receiver
    if (data.receiverId && data.senderId) {
      try {
        await createNotification({
          userId: data.receiverId,
          senderId: data.senderId,
          type: "comment",
          title: "New comment on your task",
          message: data.comment || "Someone commented on your task",
          taskId: data.taskId,
          isRead: false,
        });
      } catch (notifErr) {
        console.error("Error creating notification:", notifErr);
      }
    }

    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const editComment = async ({ commentId, data }) => {
  try {
    const res = await commentClient.put(`/${commentId}`,JSON.stringify(data.comment),);
    console.log(res);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};
const deleteComment = async (commentId) => {
  try {
    const res = await commentClient.delete(`/${commentId}`);
    console.log(res);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

export { getCommentsById, pushComment, editComment, deleteComment };
