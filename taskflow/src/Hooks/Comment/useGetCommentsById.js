import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../Context/AuthContext";
import { getCommentsById } from "../../Api/api/comment.api";

const useGetCommentsById = (memberId, managerId, taskid) => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["comments", taskid, memberId, managerId],
    queryFn: () => getCommentsById(memberId, managerId, taskid),
    keepPreviousData: true,
    enabled: !!token,
  });
};

export default useGetCommentsById;
