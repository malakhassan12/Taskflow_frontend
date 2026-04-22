import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../Context/AuthContext";
import { getUserNotifications } from "../../Api/api/notification.api";

const useGetUserNotifications = (userId) => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => getUserNotifications(userId),
    enabled: !!token && !!userId,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export default useGetUserNotifications;
