import { Button, Tooltip } from "antd";
import handleDownloadFile from "../../../Functions/Tasks/DowloadTask";
import { DownloadOutlined } from "@ant-design/icons";

const DownloadTaskBtn = ({ file }) => {
  const handleClick = () => {
    if (file?.fileId && file?.fileName) {
      handleDownloadFile(file.fileId, file.fileName);
    } else if (file?.fileId) {
      handleDownloadFile(file.fileId, `file_${file.fileId}`);
    } else {
      console.error("No file ID available");
    }
  };

  return (
    <Tooltip title="Download File">
      <Button
        icon={<DownloadOutlined />}
        size="small"
        onClick={handleClick}
        type="text"
      />
    </Tooltip>
  );
};

export default DownloadTaskBtn;