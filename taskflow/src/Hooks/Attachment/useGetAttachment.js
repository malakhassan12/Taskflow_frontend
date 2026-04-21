import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../Context/AuthContext";
import {  getAttachment } from "../../Api/api/attachment.api";

const useGetAttachment = (taskId) => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["attachment", taskId],
    queryFn: () => getAttachment(taskId),
    keepPreviousData: true,
    enabled: !!token,
  });
};

export default useGetAttachment;
