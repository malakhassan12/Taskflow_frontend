import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../Context/AuthContext";
import { getAllMembersPerProject } from "../../Api/api/manager.api";

const useGetAllMembersPerProject = (projectId) => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["members", projectId],
    queryFn: () => getAllMembersPerProject(projectId),
    keepPreviousData: true,
    enabled: !!token,
  });
};

export default useGetAllMembersPerProject;
