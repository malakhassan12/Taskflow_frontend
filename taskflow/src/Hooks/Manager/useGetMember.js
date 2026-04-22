import { useQuery } from "@tanstack/react-query";
import { getMember } from "../../Api/api/manager.api";
import { useAuth } from "../../Context/AuthContext";

const useGetMember = (memberId) => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["member", memberId],
    queryFn: () => getMember(memberId),
    keepPreviousData: true,
    enabled: !!token || !memberId,
  });
};

export default useGetMember;
