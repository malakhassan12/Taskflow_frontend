// Components/Loaders/LoadingSpinner.jsx
import { Spin, Typography, Flex } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { Text } = Typography;

const LoadingSpinner = ({ text = "Loading...", size = "large" }) => {
  return (
    <Flex
      justify="center"
      align="center"
      style={{ minHeight: "200px", flexDirection: "column", gap: "16px" }}
    >
      <Spin size={size} indicator={<LoadingOutlined spin />} />
      <Text type="secondary">{text}</Text>
    </Flex>
  );
};

export default LoadingSpinner;