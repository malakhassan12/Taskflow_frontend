import { message } from "antd";
import axios from "axios";

const handleDownloadFile = async (fileId, fileName) => {
  if (!fileId) {
    message.error("File ID not found");
    return;
  }

  try {
    const res = await axios.get(
      `http://taskflowproject1.runasp.net/api/Attachment/download/${fileId}`,
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    // Get content type from response
    const contentType = res.headers["content-type"];
    const blob = new Blob([res.data], { type: contentType });

    // Create download URL
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || `file_${fileId}`;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    message.success("File downloaded successfully");
  } catch (err) {
    console.error("Download error:", err);
    message.error(err?.response?.data?.message || "Failed to download file");
  }
};

export default handleDownloadFile;