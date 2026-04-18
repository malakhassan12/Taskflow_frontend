import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../Context/AuthContext";
import { getAllManagersByStatus } from "../../Api/api/admin.api";

const useGetAllManagersByStatus = (status , page = 1, limit = 10) => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["statusRequests", page, limit],
    queryFn: () => getAllManagersByStatus(status , page, limit),
    keepPreviousData: true,
    enabled: !!token,
  });
};

export default useGetAllManagersByStatus;
