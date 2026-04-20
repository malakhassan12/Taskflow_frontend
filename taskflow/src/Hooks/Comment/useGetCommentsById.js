import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../Context/AuthContext";
import { getCommentsById } from "../../Api/api/comment.api";

const useGetCommentsById = (userId) => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["comments", userId],
    queryFn: () => getCommentsById(userId),
    keepPreviousData: true,
    enabled: !!token,
  });
};

export default useGetCommentsById;
