import React, { createContext, useContext, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
import useGetUserNotifications from "../Hooks/Notification/useGetUserNotifications";
import { markNotificationAsRead, deleteNotification } from "../Api/api/notification.api";

const NotificationsContext = createContext(null);

export const NotificationsProvider = ({ children }) => {
  const { user } = useAuth();
  const userId = user?.userId;
  
  // Fetch notifications from backend
  const { data: backendNotifications = [], refetch } = useGetUserNotifications(userId);
  
  const [localNotifications, setLocalNotifications] = useState([]);

  // Combine backend and local notifications
  const notifications = useMemo(() => {
    const backendWithIds = (backendNotifications || []).map((n) => ({
      id: n.id || n.notificationId,
      type: n.type || "info",
      title: n.title || n.message || "Notification",
      message: n.message || n.description || "",
      createdAt: n.createdAt || n.createdDate || Date.now(),
      isRead: n.isRead || false,
      ...n,
    }));
    return [...backendWithIds, ...localNotifications];
  }, [backendNotifications, localNotifications]);

  const addNotification = ({ type = "updated", title, message }) => {
    const item = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      type,
      title,
      message,
      createdAt: Date.now(),
      isRead: false,
    };
    setLocalNotifications((prev) => [item, ...prev].slice(0, 30));
  };

  const clearNotifications = () => {
    setLocalNotifications([]);
  };

  const markAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId);
      refetch();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const removeNotification = async (notificationId) => {
    try {
      await deleteNotification(notificationId);
      refetch();
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const value = useMemo(
    () => ({ 
      notifications, 
      addNotification, 
      clearNotifications,
      markAsRead,
      removeNotification,
      refetch 
    }),
    [notifications, refetch],
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
