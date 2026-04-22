import { Card, Typography, Flex, Button, Avatar, Space, Tooltip, Grid } from "antd";
import { DownloadOutlined, FileOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import DownloadTaskBtn from "../Buttons/Task/DownloadTaskBtn";

const { Text } = Typography;
const { useBreakpoint } = Grid;

// Get file icon based on file extension
const getFileIcon = (fileName) => {
  const extension = fileName?.split('.').pop()?.toLowerCase();
  
  const iconMap = {
    pdf: { icon: "📄", bg: "#ff4d4f20", color: "#ff4d4f" },
    doc: { icon: "📘", bg: "#1890ff20", color: "#1890ff" },
    docx: { icon: "📘", bg: "#1890ff20", color: "#1890ff" },
    xls: { icon: "📗", bg: "#52c41a20", color: "#52c41a" },
    xlsx: { icon: "📗", bg: "#52c41a20", color: "#52c41a" },
    ppt: { icon: "📙", bg: "#faad1420", color: "#faad14" },
    pptx: { icon: "📙", bg: "#faad1420", color: "#faad14" },
    png: { icon: "🖼️", bg: "#722ed120", color: "#722ed1" },
    jpg: { icon: "🖼️", bg: "#722ed120", color: "#722ed1" },
    jpeg: { icon: "🖼️", bg: "#722ed120", color: "#722ed1" },
    zip: { icon: "🗜️", bg: "#fa8c1620", color: "#fa8c16" },
    rar: { icon: "🗜️", bg: "#fa8c1620", color: "#fa8c16" },
  };

  return iconMap[extension] || { icon: "📁", bg: "#f0f0f0", color: "#8c8c8c" };
};


const FileCard = ({ file }) => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  
  const fileStyle = getFileIcon(file.fileName);
  
  // Extract file name without path
  const displayName = file.fileName?.split('_').pop() || file.fileName || "Unknown file";
  
  // Format date
  const formattedDate = file.uploadDate 
    ? dayjs(file.uploadDate).format("MMM DD, YYYY")
    : "Unknown date";

 

  return (
    <Card
      hoverable
      styles={{ body: { padding: isMobile ? "12px 16px" : "12px 20px" } }}
      style={{ borderRadius: "12px", border: "1px solid #f0f0f0" }}
    >
      <Flex 
        justify="space-between" 
        align={isMobile ? "flex-start" : "center"} 
        wrap="wrap"
        gap="middle"
        vertical={isMobile}
      >
        {/* Left Side: Icon and Info */}
        <Flex 
          align={isMobile ? "flex-start" : "center"} 
          gap="middle"
          wrap="wrap"
          vertical={isMobile && !screens.sm}
          style={{ flex: 1 }}
        >
          <Avatar
            shape="square"
            size={isMobile ? 40 : 48}
            style={{
              backgroundColor: fileStyle.bg,
              color: fileStyle.color,
              borderRadius: "8px",
              fontSize: isMobile ? "20px" : "24px",
            }}
          >
            {fileStyle.icon}
          </Avatar>
          
          <Flex vertical style={{ flex: 1 }}>
            <Text strong style={{ fontSize: isMobile ? "13px" : "14px", wordBreak: "break-word" }}>
              {displayName}
            </Text>
            <Flex wrap="wrap" gap={8} style={{ marginTop: 4 }}>
              <Text type="secondary" style={{ fontSize: "11px" }}>
                Task ID: #{file.taskId}
              </Text>
              <Text type="secondary" style={{ fontSize: "11px" }}>
                Uploaded: {formattedDate}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        {/* Right Side: Actions */}
        <Space wrap style={{ alignSelf: isMobile ? "flex-end" : "center" }}>
          <DownloadTaskBtn file={file}/>
        </Space>
      </Flex>
    </Card>
  );
};

export default FileCard;