import { Button, Tooltip } from "antd";
import { useTheme } from "../../Context/DarkModeProvider";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

const DarkModeBtn = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Tooltip title={isDarkMode ? "Light Mode" : "Dark Mode"}>
      <Button
        type="text"
        shape="circle"
        onClick={toggleTheme}
        icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
        style={{
          fontSize: 18,
          color: isDarkMode ? "#faad14" : "#1890ff",
          transition: "all 0.3s ease",
        }}
      />
    </Tooltip>
  );
};

export default DarkModeBtn;