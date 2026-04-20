import commentClient from "../client/comment.client";

const getCommentsById = async (id) => {
  try {
    const res = await commentClient.get(`/ById?Id=${id}`);
    console.log(res);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

// Update in the Back
const pushComment = async (data) => {
  //     {
  //   "id": 0,
  //   "comment": "string",
  //   "taskId": 0,
  //   "userId": "string",
  //   "createdAt": "2026-04-20T18:00:20.094Z"
  // }
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
