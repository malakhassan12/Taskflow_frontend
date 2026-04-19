import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../Context/AuthContext";
import { getTask } from "../../Api/api/task.api";

const useGetTask = (taskId) => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTask(taskId),
    keepPreviousData: true,
    enabled: !!token,
  });
};

export default useGetTask;
