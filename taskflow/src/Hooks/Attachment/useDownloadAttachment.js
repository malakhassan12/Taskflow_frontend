import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../Context/AuthContext";
import { downloadAttachment } from "../../Api/api/attachment.api";

const useDownloadAttachment = (taskId) => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["dowload-attachments", taskId],
    queryFn: () => downloadAttachment(taskId),
    keepPreviousData: true,
    enabled: !!token,
  });
};

export default useDownloadAttachment;
