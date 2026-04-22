import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../Context/AuthContext";
import { getStatisticsForManager } from "../../Api/api/manager.api";

const useGetStatisticsForManager = () => {
  const { token , user } = useAuth();
  console.log(user)
  return useQuery({
    queryKey: ["statistics-for-manager", user?.userId],
    queryFn: () => getStatisticsForManager(),
    keepPreviousData: true,
    enabled: !!token,
  });
};

export default useGetStatisticsForManager;
