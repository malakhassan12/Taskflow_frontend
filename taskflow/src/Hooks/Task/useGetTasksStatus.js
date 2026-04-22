import { useQueries,  } from "@tanstack/react-query";
import { getTasksStatus } from "../../Api/api/task.api";


const useGetTasksStatus = (tasks = [], projectId) => {
  const queries = useQueries({
    queries: tasks.map((task) => ({
      queryKey: ["status-tasks", task.id, projectId],
      queryFn: () => getTasksStatus(task.id, projectId),
      enabled: !!task.id && !!projectId,
    })),
  });

  const tasksWithStatus = tasks.map((task, index) => {
    const data = queries[index]?.data;

    return {
      ...task,
      status: data?.status?.[0] || "unknown", 
      approved: data?.statusApproval?.[0] === "APPROVED",
    };
  });

  return {
    data: tasksWithStatus,
    isLoading: queries.some((q) => q.isLoading),
    isError: queries.some((q) => q.isError),
  };
};
export default useGetTasksStatus;
