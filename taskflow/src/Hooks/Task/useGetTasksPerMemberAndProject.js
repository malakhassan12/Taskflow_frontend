import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../Context/AuthContext";
import { getTasksPerMemberAndProject } from "../../Api/api/task.api";

const useGetTasksPerMemberAndProject = (memberId, projectId) => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["task", memberId, projectId],
    queryFn: () => getTasksPerMemberAndProject(memberId, projectId),
    keepPreviousData: true,
    enabled: !!token,
  });
};

export default useGetTasksPerMemberAndProject;
