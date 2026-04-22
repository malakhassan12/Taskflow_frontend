import { useQuery } from "@tanstack/react-query";
import { getTasksStatus } from "../../Api/api/task.api";

const useGetTaskStatus = (taskId, projectId) => {
  return useQuery({
    queryKey: ["status-task", taskId, projectId],
    queryFn: () => getTasksStatus(taskId, projectId),
    enabled: !!taskId && !!projectId,
  });
};
export default useGetTaskStatus;
