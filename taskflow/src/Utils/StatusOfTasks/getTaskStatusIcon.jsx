
import {
  ClockCircleOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
  InboxOutlined,
} from "@ant-design/icons";

const normalizeStatus = (status) =>
  status?.toString().toLowerCase().replace(/_/g, "-");

const getTaskStatusIcon = (status) => {
  const key = normalizeStatus(status);

  const iconMap = {
    pending: <ClockCircleOutlined />,
    "in-progress": <SyncOutlined spin />,
    completed: <CheckCircleOutlined />,
    rejected: <CloseCircleOutlined />,
    approved: <CheckCircleOutlined />,
    todo: <InboxOutlined />,
    done: <CheckCircleOutlined/>,
    active: <CheckCircleOutlined/>,

    default: <FileTextOutlined />,
  };

  return iconMap[key] || iconMap.default;
};

export default getTaskStatusIcon;

