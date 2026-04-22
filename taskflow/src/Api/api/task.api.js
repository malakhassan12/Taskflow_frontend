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

const getAllTasks = async () => {
  try {
    const res = await taskClient.get("");
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const getTasksPerMemberAndProject = async (memberId, projectId) => {
  try {
    const res = await taskClient.get(`/GetTasksForOneMember`, {
      params: { userId: memberId, projectId: projectId },
    });
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const approveTask = async (taskId, userId) => {
  try {
    const res = await taskClient.post(`/Accept`, {
      params: { userId: userId, taskId: taskId },
    });
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const rejectTask = async (taskId, userId) => {
  try {
    const res = await taskClient.post(`/Reject`, {
      params: { userId: userId, taskId: taskId },
    });
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const getTasksStatus = async (id, projectId) => {
  try {
    const res = await taskClient.get(`/GetTaskStatus`, {
      params: { id: id, projectId: projectId },
    });
    return res?.data;
  } catch (err) {
    throw { err };
  }
};
export {
  getTask,
  deleteTask,
  getAllTasks,
  getTasksPerMemberAndProject,
  approveTask,
  rejectTask,
  getTasksStatus,
};
