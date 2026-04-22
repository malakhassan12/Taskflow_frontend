import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../Context/AuthContext";
import { getProject } from "../../Api/api/manager.api";

const useGetProject = (projectId) => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProject(projectId),
    keepPreviousData: true,
    enabled: !!token,
  });
};

export default useGetProject;
