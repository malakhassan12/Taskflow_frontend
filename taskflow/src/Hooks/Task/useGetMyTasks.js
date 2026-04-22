import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../Context/AuthContext";
import { getMyTasks } from "../../Api/api/task.api";

const useGetMyTasks = (userId) => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["myTasks", userId],
    queryFn: () => getMyTasks(userId),
    enabled: !!token && !!userId,
  });
};

export default useGetMyTasks;
