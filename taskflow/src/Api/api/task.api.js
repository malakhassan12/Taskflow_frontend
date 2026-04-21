import taskClient from "../client/task.client";

const getTask = async (taskId) => {
  try {
    const res = await taskClient.get(`/${taskId}`);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const deleteTask = async (taskId) => {
  try {
    const res = await taskClient.delete(`/${taskId}`);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

<<<<<<< HEAD
const getAllTasks = async () => {
  try {
    const res = await taskClient.get("");
=======
const getTasksPerMemberAndProject = async (memberId, projectId) => {
  try {
    const res = await taskClient.get(`/GetTasksForOneMember`, {
      params: { userId : memberId, projectId : projectId },
    });
>>>>>>> 36f729118b9c1affeb159234cb46150ba40bc3b8
    return res?.data;
  } catch (err) {
    throw { err };
  }
};
<<<<<<< HEAD

export { getTask, deleteTask, getAllTasks };
=======
export { getTask, deleteTask, getTasksPerMemberAndProject };
>>>>>>> 36f729118b9c1affeb159234cb46150ba40bc3b8
