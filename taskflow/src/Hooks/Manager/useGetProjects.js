import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../Api/api/manager.api";
import { useAuth } from "../../Context/AuthContext";

const useGetProjects = () => {
  const { token, user } = useAuth();
  return useQuery({
    queryKey: ["managerProjects", user?.userId],
    queryFn: () => getProjects(user?.userId),
    keepPreviousData: true,
    enabled: !!token,
  });
};

export default useGetProjects;
