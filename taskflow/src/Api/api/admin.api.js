import adminClient from "../client/admin.client";
import managerClient from "../client/manager.client";

const getPendingRequests = async (page = 1, limit = 10) => {
  try {
    const res = await adminClient.get(`/pending?page=${page}&limit=${limit}`);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const approveManager = async (userId) => {
  try {
    const res = await adminClient.put(`/approve/${userId}`);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const rejectManager = async (userId) => {
  try {
    const res = await adminClient.delete(`/reject/${userId}`);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const getAllManagersByStatus = async (status, page = 1, limit = 10) => {
  try {
    const res = await adminClient.get(
      `/UserWithStatus?isapproved=${status}&page=${page}&limit=${limit}`,
    );
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

const getAllNotifications = async () => {
  try {
    const res = await managerClient.get("/Notification");
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const getUserNotifications = async (userId) => {
  try {
    const res = await managerClient.get(`/Notification/user/${userId}`);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const markNotificationAsRead = async (notificationId) => {
  try {
    const res = await managerClient.put(`/Notification/markAsRead/${notificationId}`);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const deleteNotification = async (notificationId) => {
  try {
    const res = await managerClient.delete(`/Notification/${notificationId}`);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

export {
  getPendingRequests,
  approveManager,
  rejectManager,
  getAllManagersByStatus,
  getAllUsers,
  getAllNotifications,
  getUserNotifications,
  markNotificationAsRead,
  deleteNotification,
};
