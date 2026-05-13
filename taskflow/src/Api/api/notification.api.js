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

export const normalizeNotificationList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.notifications)) return payload.notifications;
  return [];
};

/** Backend returns 400 + plain text when the user has no notifications (treat as empty). */
const isNoNotificationsEmptyResponse = (err) => {
  if (err?.response?.status !== 400) return false;
  const raw = err?.response?.data;
  const msg =
    typeof raw === "string"
      ? raw
      : raw?.message ?? raw?.title ?? raw?.Message ?? "";
  return String(msg).toLowerCase().includes("no notifications found");
};

const getUserNotifications = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API_BASE}/api/Notification/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return normalizeNotificationList(res?.data);
  } catch (err) {
    if (isNoNotificationsEmptyResponse(err)) {
      return [];
    }
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
