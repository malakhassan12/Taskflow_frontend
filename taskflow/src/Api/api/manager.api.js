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
const updateTask = async (taskData) => {
  try {
<<<<<<< HEAD
    const res = await managerClient.put(`/Task`);
=======
    const res = await managerClient.put(
      `/Task?taskID=${taskData.id}`,
      taskData,
    );
    console.log(res);
>>>>>>> 36f729118b9c1affeb159234cb46150ba40bc3b8
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
<<<<<<< HEAD
    const res = await managerClient.get(`http://taskflowproject1.runasp.net/allteammember`);
=======
    const res = await managerClient.get(
      `http://taskflowproject1.runasp.net/allteammember`,
    );
    console.log(res);
>>>>>>> 36f729118b9c1affeb159234cb46150ba40bc3b8
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

<<<<<<< HEAD
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
=======
const getAllMembersPerProject = async (projectId) => {
  try {
    const res = await managerClient.get(
      `http://taskflowproject1.runasp.net/api/User/allTeamMemberByProjectID?id=${projectId}`,
    );
    console.log(res);
>>>>>>> 36f729118b9c1affeb159234cb46150ba40bc3b8
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const getTeams = async () => {
  try {
    const res = await managerClient.get(`/Project/projects`);
    console.log(res);
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
<<<<<<< HEAD
  getPendingProjects,
  getUserWithStatus,
  approveUser,
  rejectUser,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  updateProjectStatus,
=======
  getAllMembersPerProject,
  getTeams,
>>>>>>> 36f729118b9c1affeb159234cb46150ba40bc3b8
};
