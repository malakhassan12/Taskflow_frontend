import managerClient from "../client/manager.client";

const createProject = async (data) => {
  try {
    const res = await managerClient.post("/Project", data);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const getProjects = async (managerId) => {
  console.log(managerId);
  try {
    const res = await managerClient.get(`/Project/manager`, {
      params: { managerId: managerId },
    });
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
    const res = await managerClient.put(
      `/Task?taskID=${taskData.id}`,
      taskData,
    );
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
    const res = await managerClient.get(`User/allteammember`);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const getPendingProjects = async () => {
  try {
    const res = await managerClient.get("/Project/GetPendingProjects");
    console.log("RAW RESPONSE:", res);
    const pendingProjects =
      typeof res?.data === "string" ? JSON.parse(res?.data) : res?.data || [];
    console.log(pendingProjects);

    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const getUserWithStatus = async () => {
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

const updateProjectStatus = async ({ projectId, newStatus }) => {
  console.log(projectId, newStatus);
  try {
    const res = await managerClient.patch(
      `/Project/ProjectStatus?projectId=${projectId}&newStatus=${newStatus}`,
    );
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const getAllMembersPerProject = async (projectId) => {
  try {
    const res = await managerClient.get(
      `/User/allTeamMemberByProjectID?id=${projectId}`,
    );
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const getTeams = async () => {
  try {
    const res = await managerClient.get(`/Project/projects`);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const getStatisticsForManager = async () => {
  try {
    const res = await managerClient.get(`/Project/Statistics`);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const getTaskStatusPerProject = async (projectId) => {
  try {
    const res = await managerClient.get(`/Project/TaskStatus`, {
      params: { projectId: projectId },
    });
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const getMember = async (id) => {
  try {
    const res = await managerClient.get(`/User/${id}`);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const getAllProjects = async () => {
  try {
    const res = await managerClient.get("/Project");
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const getProjectStatistics = async () => {
  try {
    const res = await managerClient.get("/Project/Statistics");
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const getProjectProgress = async (projectId) => {
  try {
    const res = await managerClient.get(`/Project/progress/${projectId}`);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const getProjectTaskStatus = async () => {
  try {
    const res = await managerClient.get("/Project/TaskStatus");
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const getAllTasks = async () => {
  try {
    const res = await managerClient.get("/Task");
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
  getAllMembers,
  getPendingProjects,
  getUserWithStatus,
  approveUser,
  rejectUser,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  updateProjectStatus,
  getAllMembersPerProject,
  getTeams,
  getStatisticsForManager,
  getTaskStatusPerProject,
  getMember,
  getAllProjects,
  getProjectStatistics,
  getProjectProgress,
  getProjectTaskStatus,
  getAllTasks,
  getTasksPerProject,
};
