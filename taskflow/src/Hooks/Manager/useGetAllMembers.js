import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../Context/AuthContext";
import { getAllMembers } from "../../Api/api/manager.api";

const useGetAllMembers = () => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["members"],
    queryFn: () => getAllMembers(),
    keepPreviousData: true,
    enabled: !!token,
  });
};

export default useGetAllMembers;
