import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../Context/AuthContext";
import { getPendingProjects } from "../../Api/api/manager.api";

const useGetPendingRequests = () => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["pendingRequests"],
    queryFn: () => getPendingProjects(),
    keepPreviousData: true,
    enabled: !!token,
  });
};

export default useGetPendingRequests;
