import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import useGetUserNotifications from "../Hooks/Notification/useGetUserNotifications";
import { markNotificationAsRead, deleteNotification } from "../Api/api/notification.api";
import { getNotificationTimestampMs } from "../Utils/notificationDate";

const NotificationsContext = createContext(null);

const isAdminRole = (role) => {
  if (role == null || role === "") return false;
  const roles = Array.isArray(role) ? role : [role];
  return roles.some((r) => String(r).trim().toLowerCase() === "admin");
};

const isManagerRole = (role) => {
  if (role == null || role === "") return false;
  const roles = Array.isArray(role) ? role : [role];
  return roles.some((r) => {
    const s = String(r).trim().toLowerCase().replace(/[\s_]+/g, "");
    return s === "manager" || s === "projectmanager";
  });
};

export const NotificationsProvider = ({ children }) => {
  const { user } = useAuth();
  const userId = user?.userId;
  const isAdmin = isAdminRole(user?.role);
  const isManager = isManagerRole(user?.role);
  const skipNotificationApi = isAdmin || isManager;

  const { data: backendNotifications = [], refetch } =
    useGetUserNotifications(userId);

  const [localNotifications, setLocalNotifications] = useState([]);

  const notifications = useMemo(() => {
    const backendWithIds = (backendNotifications || []).map((n) => {
      const merged = { ...n };
      return {
        ...merged,
        id:
          merged.id ??
          merged.notificationId ??
          merged.NotificationId,
        type: merged.type ?? merged.Type ?? "info",
        title: merged.title ?? merged.Title ?? "Notification",
        message:
          merged.message ??
          merged.Message ??
          merged.description ??
          merged.Description ??
          "",
        createdAt:
          getNotificationTimestampMs(
            merged.createdAt ??
              merged.CreatedAt ??
              merged.createdDate ??
              merged.CreatedDate,
          ) ?? Date.now(),
        isRead: merged.isRead ?? merged.IsRead ?? false,
      };
    });
    return [...backendWithIds, ...localNotifications];
  }, [backendNotifications, localNotifications]);

  const addNotification = useCallback(({ type = "updated", title, message }) => {
    const item = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      type,
      title,
      message,
      createdAt: Date.now(),
      isRead: false,
    };
    setLocalNotifications((prev) => [item, ...prev].slice(0, 30));
  }, []);

  const clearNotifications = useCallback(() => {
    setLocalNotifications([]);
  }, []);

  const markAsRead = useCallback(
    async (notificationId) => {
      const isLocal = localNotifications.some((n) => n.id === notificationId);
      if (isLocal) {
        setLocalNotifications((prev) =>
          prev.map((n) =>
            n.id === notificationId ? { ...n, isRead: true } : n,
          ),
        );
        return;
      }
      if (skipNotificationApi) return;

      try {
        await markNotificationAsRead(notificationId);
        refetch();
      } catch (error) {
        console.error("Error marking notification as read:", error);
      }
    },
    [skipNotificationApi, localNotifications, refetch],
  );

  const removeNotification = useCallback(
    async (notificationId) => {
      const isLocal = localNotifications.some((n) => n.id === notificationId);
      if (isLocal) {
        setLocalNotifications((prev) =>
          prev.filter((n) => n.id !== notificationId),
        );
        return;
      }
      if (skipNotificationApi) return;

      try {
        await deleteNotification(notificationId);
        refetch();
      } catch (error) {
        console.error("Error deleting notification:", error);
      }
    },
    [skipNotificationApi, localNotifications, refetch],
  );

  const value = useMemo(
    () => ({
      notifications,
      addNotification,
      clearNotifications,
      markAsRead,
      removeNotification,
      refetch,
    }),
    [
      notifications,
      addNotification,
      clearNotifications,
      markAsRead,
      removeNotification,
      refetch,
    ],
  );

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error("useNotifications must be used inside NotificationsProvider");
  }
  return context;
};
