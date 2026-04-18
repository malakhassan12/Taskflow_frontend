import { useQuery } from "@tanstack/react-query";
import { getPendingRequests } from "../../Api/api/admin.api";
import { useAuth } from "../../Context/AuthContext";

const useGetPendingRequests = (page = 1, limit = 10) => {
  const { token } = useAuth(); // Call the hook here (Legal!)
  return useQuery({
    queryKey: ["pendingRequests", page, limit],
    queryFn: () => getPendingRequests(page, limit),
    keepPreviousData: true, 
    enabled : !!token
  });
};

export default useGetPendingRequests;
