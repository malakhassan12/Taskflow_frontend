import managerClient from "../client/manager.client";

const createProject = async (data) => {
  try {
    const res = await managerClient.post("/Project", data);
    console.log(res);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const getProjects = async (page = 1, limit = 10) => {
  try {
    const res = await managerClient.get(`/Project?page=${page}&limit=${limit}`);
    console.log(res);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const deleteProject = async (projectId) => {
  try {
    const res = await managerClient.delete(`/Project/${projectId}`);
    console.log(res);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

export { createProject, getProjects, deleteProject };
