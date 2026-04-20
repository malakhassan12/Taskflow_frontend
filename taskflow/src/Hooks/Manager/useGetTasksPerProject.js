import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../Context/AuthContext";
import { getTasksPerProject } from "../../Api/api/manager.api";

const useGetTasksPerProject = (projectId) => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => getTasksPerProject(projectId),
    keepPreviousData: true,
    enabled: !!token,
  });
};

export default useGetTasksPerProject;
