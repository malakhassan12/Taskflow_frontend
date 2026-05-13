import axios from "axios";

const API_BASE = "http://taskflowproject1.runasp.net";

const getAllNotifications = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API_BASE}/api/Notification`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const getUserNotifications = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API_BASE}/api/Notification/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res?.data;
  } catch (err) {
    console.error("Error fetching notifications:", err);
    throw { err };
  }
};

const markNotificationAsRead = async (notificationId) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(
      `${API_BASE}/api/Notification/markAsRead/${notificationId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const deleteNotification = async (notificationId) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`${API_BASE}/api/Notification/${notificationId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const createNotification = async (notificationData) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(`${API_BASE}/api/Notification`, notificationData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

export {
  getAllNotifications,
  getUserNotifications,
  markNotificationAsRead,
  deleteNotification,
  createNotification,
};
