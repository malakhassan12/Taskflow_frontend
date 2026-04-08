// ==================== Ant Design  ====================

import { Header } from "antd/es/layout/layout";
import { Grid, Avatar, Typography, Tooltip, Button, Flex } from "antd";

// ==================== Components  ====================

import OpenDrawerBtn from "../Buttons/OpenDrawerBtn";
import Logo from "../Logo/Logo";
import DarkModeBtn from "../Buttons/DarkModeBtn";

// ==================== Icons  ====================

import { FaRegUser } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
// ==================== Constants  ====================

import { primaryColor } from "../../Constants/Colors";

const { Text } = Typography;

const { useBreakpoint } = Grid;

const Nav = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
        display: "flex",
        alignItems: "center",
        background: primaryColor,
        justifyContent: "space-between",
        padding: "0 24px",
      }}
    >
      {/* LEFT */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Logo />
        {isMobile && <OpenDrawerBtn />}
      </div>

      {/* RIGHT */}
      <Flex align="center" gap={20}>
        {!isMobile && (
          <Text type="secondary" style={{ fontSize: 14 }}>
            Welcome back, Sarah 👋
          </Text>
        )}

        <Tooltip title="Notifications">
          <Button
            type="text"
            shape="circle"
            icon={<IoIosNotificationsOutline style={{ fontSize: 20 }} />}
          />
        </Tooltip>

        <Tooltip title="Profile">
          <Avatar icon={<FaRegUser />} style={{ cursor: "pointer" }} />
        </Tooltip>

        <DarkModeBtn />
      </Flex>
    </Header>
  );
};
export default Nav;
