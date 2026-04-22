import React, { createContext, useContext, useMemo, useState } from "react";

const NotificationsContext = createContext(null);

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = ({ type = "updated", title, message }) => {
    const item = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      type,
      title,
      message,
      createdAt: Date.now(),
    };
    setNotifications((prev) => [item, ...prev].slice(0, 30));
  };

  const clearNotifications = () => setNotifications([]);

  const value = useMemo(
    () => ({ notifications, addNotification, clearNotifications }),
    [notifications],
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
