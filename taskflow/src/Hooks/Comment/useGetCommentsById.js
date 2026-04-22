import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../Context/AuthContext";
import { getCommentsById } from "../../Api/api/comment.api";

const useGetCommentsById = (memberId , managerId) => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["comments", memberId , managerId],
    queryFn: () => getCommentsById(memberId , managerId),
    keepPreviousData: true,
    enabled: !!token,
  });
};

export default useGetCommentsById;
