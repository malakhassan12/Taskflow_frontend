import commentClient from "../client/comment.client";

const getCommentsById = async (memberId, managerId) => {
  try {
    const res = await commentClient.get(`/ById`, {
      params: { SenderId: managerId, ReciverID: memberId },
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
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const editComment = async (commentId, data) => {
  try {
    const res = await commentClient.put(`/${commentId}`, data);
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
