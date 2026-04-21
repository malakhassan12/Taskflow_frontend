import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../Context/AuthContext";
import { getTeams } from "../../Api/api/manager.api";

const useGetTeams = (managerId) => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["teams", managerId],
    queryFn: () => getTeams(),
    keepPreviousData: true,
    enabled: !!token,
  });
};

export default useGetTeams;
