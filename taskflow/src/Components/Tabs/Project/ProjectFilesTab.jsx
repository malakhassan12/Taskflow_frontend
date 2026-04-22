import { Flex, Empty, Spin, Typography } from "antd";
import { FileOutlined } from "@ant-design/icons";
import FileCard from "../../Cards/FileCard";
import useGetAllAttachmentPerProject from "../../../Hooks/Attachment/useGetAllAttachmentPerProject";
import { useParams } from "react-router-dom";
import DataLoad from "../../Loaders/DataLoad";
import DataError from "../../Error/DataError";

const { Title, Text } = Typography;

const ProjectFilesTab = () => {
  const { projectId } = useParams();
  const {
    data: files,
    isLoading,
    error,
  } = useGetAllAttachmentPerProject(projectId);

  console.log(files)
  if (isLoading) {
    return <DataLoad />;
  }

  if (error) {
    return <DataError />;
  }

  return (
    <div style={{ padding: "4px" }}>
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <Title level={4} style={{ margin: 0 }}>
          Project Files
        </Title>
        <Text type="secondary">{files?.length || 0} files uploaded</Text>
      </div>

      {/* File List */}
      {files?.length === 0 ? (
        <Empty description="No files uploaded yet" />
      ) : (
        <Flex vertical gap="middle">
          {files?.map((file) => (
            <FileCard key={file.fileId} file={file} />
          ))}
        </Flex>
      )}
    </div>
  );
};

export default ProjectFilesTab;
