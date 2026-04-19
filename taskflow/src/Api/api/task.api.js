import taskClient from "../client/task.client";

const getTask = async (taskId) => {
  try {
    const res = await taskClient.get(`/${taskId}`);
    console.log(res);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const deleteTask = async (taskId) => {
  try {
    const res = await taskClient.delete(`/${taskId}`);
    console.log(res);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

export { getTask, deleteTask };
