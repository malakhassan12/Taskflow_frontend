import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../Context/AuthContext";
import { getAllAttachmentPerProject } from "../../Api/api/attachment.api";

const useGetAllAttachmentPerProject = (projectId) => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["attachments", projectId],
    queryFn: () => getAllAttachmentPerProject(projectId),
    keepPreviousData: true,
    enabled: !!token,
  });
};

export default useGetAllAttachmentPerProject;
