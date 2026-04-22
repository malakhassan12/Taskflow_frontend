import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../Context/AuthContext";
import { downloadAttachment } from "../../Api/api/attachment.api";

const useDownloadAttachment = (attachmentId) => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["dowload-attachment", attachmentId],
    queryFn: () => downloadAttachment(attachmentId),
    keepPreviousData: true,
    enabled: !!token,
  });
};

export default useDownloadAttachment;
