import { Switch, Space } from "antd";
import { useTheme } from "../../Context/DarkModeProvider";

const DarkModeBtn = () => {
  const { isDarkMode, toggleTheme  } = useTheme();

  return (
    <Switch
      checked={isDarkMode}
      onChange={toggleTheme}
      checkedChildren="🌙"
      unCheckedChildren="☀️"
    />
  );
};

export default DarkModeBtn;
