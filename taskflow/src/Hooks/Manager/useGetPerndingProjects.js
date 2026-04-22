import { useQuery } from "@tanstack/react-query";
import { getPendingProjects } from "../../Api/api/manager.api";
import { useAuth } from "../../Context/AuthContext";

const useGetPendingProjects = (managerId) => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["pendingProjects", managerId],
    queryFn: () => getPendingProjects(),
    keepPreviousData: true,
    enabled: !!token,
  });
};

export default useGetPendingProjects;
