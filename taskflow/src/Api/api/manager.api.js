import managerClient from "../client/manager.client";

const createProject = async (data) => {
  try {
    const res = await managerClient.post("/Project", data);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const getProjects = async (page = 1, limit = 10) => {
  try {
    const res = await managerClient.get(`/Project?page=${page}&limit=${limit}`);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const deleteProject = async (projectId) => {
  try {
    const res = await managerClient.delete(`/Project/${projectId}`);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const getProject = async (projectId) => {
  try {
    const res = await managerClient.get(`/Project/${projectId}`);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const createTask = async (data) => {
  try {
    const res = await managerClient.post("/Task", data);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const updateTask = async () => {
  try {
    const res = await managerClient.put(`/Task`);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const getTasksPerProject = async (projectId) => {
  try {
    const res = await managerClient.get(`/Project/${projectId}`);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const getAllMembers = async () => {
  try {
    const res = await managerClient.get(`http://taskflowproject1.runasp.net/allteammember`);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const getPendingProjects = async () => {
  try {
    const res = await managerClient.get("/Project/GetPendingProjects");
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const getUserWithStatus = async (status) => {
  try {
    const res = await managerClient.get("/Account/pending");
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const approveUser = async (userId) => {
  try {
    const res = await managerClient.put(`/Account/approve/${userId}`);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const rejectUser = async (userId) => {
  try {
    const res = await managerClient.delete(`/Account/reject/${userId}`);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const getAllUsers = async () => {
  try {
    const res = await managerClient.get("/User");
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const getUserProfile = async () => {
  try {
    const res = await managerClient.get("/User/profile");
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const updateUserProfile = async (data) => {
  try {
    const res = await managerClient.put("/User/profile", data);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const updateProjectStatus = async (projectId, newStatus) => {
  try {
    const res = await managerClient.patch(`/Project/ProjectStatus?projectId=${projectId}&newStatus=${newStatus}`);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

export {
  createProject,
  getProjects,
  deleteProject,
  getProject,
  createTask,
  updateTask,
  getTasksPerProject,
  getAllMembers,
  getPendingProjects,
  getUserWithStatus,
  approveUser,
  rejectUser,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  updateProjectStatus,
};
