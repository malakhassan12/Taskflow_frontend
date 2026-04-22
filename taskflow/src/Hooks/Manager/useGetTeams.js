import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../Context/AuthContext";
import { getTeams } from "../../Api/api/manager.api";

const useGetTeams = () => {
  const { token , user } = useAuth();
  
  return useQuery({
    queryKey: ["teams", user?.userId],
    queryFn: () => getTeams(),
    keepPreviousData: true,
    enabled: !!token,
  });
};

export default useGetTeams;
