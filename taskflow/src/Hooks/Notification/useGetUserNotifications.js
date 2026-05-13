import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../Context/AuthContext";
import { getUserNotifications } from "../../Api/api/notification.api";

/** Admin / manager: notifications from NotificationsProvider only (no user endpoint). */
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

const useGetUserNotifications = (userId) => {
  const { token, user } = useAuth();
  const skipUserNotificationApi =
    isAdminRole(user?.role) || isManagerRole(user?.role);

  return useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => getUserNotifications(userId),
    enabled: !!token && !!userId && !skipUserNotificationApi,
    refetchInterval: skipUserNotificationApi ? false : 5000,
  });
};

export default useGetUserNotifications;
