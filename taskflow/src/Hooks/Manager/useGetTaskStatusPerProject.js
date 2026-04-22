import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../Context/AuthContext";
import { getTaskStatusPerProject,  } from "../../Api/api/manager.api";

const useGetTaskStatusPerProject = (projectId) => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["task-status-per-project", projectId],
    queryFn: () => getTaskStatusPerProject(projectId),
    keepPreviousData: true,
    enabled: !!token,
  });
};

export default useGetTaskStatusPerProject;
