import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../Api/api/manager.api";
import { useAuth } from "../../Context/AuthContext";

const useGetProjects = (page = 10, limit = 1) => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["managerProjects", page, limit],
    queryFn: () => getProjects(page, limit),
    keepPreviousData: true,
    enabled: !!token,
  });
};

export default useGetProjects;
