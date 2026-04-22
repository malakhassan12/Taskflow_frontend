import { Header } from "antd/es/layout/layout";
import {
  Grid,
  Avatar,
  Typography,
  Tooltip,
  Button,
  Flex,
  theme,
  Badge,
  Dropdown,
  Space,
} from "antd";

// ==================== Components ====================
import OpenDrawerBtn from "../Buttons/OpenDrawerBtn";
import Logo from "../Logo/Logo";
import DarkModeBtn from "../Buttons/DarkModeBtn";

// ==================== Icons ====================
import { FaRegUser, FaChevronDown } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { AiOutlineSetting } from "react-icons/ai";
// ==================== React-router-dom ====================

import { useNavigate } from "react-router-dom";
// ==================== Context ====================
import { useNotifications } from "../../Context/NotificationsProvider";
import { useAuth } from "../../Context/AuthContext";

const { Text } = Typography;
const { useBreakpoint } = Grid;

const Nav = () => {
  const screens = useBreakpoint();
  const { token } = theme.useToken();
  const { logout } = useAuth();

  const isMobile = !screens.md;

  const navigate = useNavigate();

  const { notifications } = useNotifications();

  const { user } = useAuth();
  console.log(user);

  const userName = user?.name || "Team Member";

  const userRole = user?.role || "User";
  const userAvatar = user.name?.charAt(0) || "U";

  // User menu items
  const userMenuItems = [
    {
      key: "profile",
      label: "Profile Settings",
      icon: <AiOutlineSetting />,
      onClick: () => navigate("settings"),
    },
    {
      key: "logout",
      label: "Logout",
      icon: <IoLogOutOutline />,
      danger: true,
      onClick: () => logout(),
    },
  ];

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: token.colorBgContainer,
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
        padding: isMobile ? "0 16px" : "0 24px",
        height: "64px",
        transition: "all 0.3s ease",
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* LEFT SECTION: Brand & Menu */}
      <Flex align="center" gap={isMobile ? 12 : 20}>
        {isMobile && <OpenDrawerBtn />}
        <Logo collapsed={isMobile} />
      </Flex>

      {/* RIGHT SECTION: Actions & User */}
      <Flex align="center" gap={isMobile ? 12 : 20}>
        {/* Notifications */}
        <Tooltip title="Notifications">
          <Badge
            count={notifications?.length || 0}
            color={token.colorPrimary}
            offset={[-2, 4]}
            size="small"
          >
            <Button
              type="text"
              shape="circle"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
              }}
              icon={
                <IoIosNotificationsOutline
                  style={{ fontSize: 20, color: token.colorText }}
                />
              }
              onClick={() => navigate("notifications")}
            />
          </Badge>
        </Tooltip>

        {/* Dark Mode Toggle */}
        <DarkModeBtn />

        {/* User Dropdown */}
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          trigger={["click"]}
          arrow
        >
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "4px 8px",
              borderRadius: 24,
              transition: "all 0.3s ease",
              background: token.colorBgTextHover,
            }}
          >
            <Avatar
              size={isMobile ? 32 : 36}
              style={{
                backgroundColor: token.colorPrimary,
                cursor: "pointer",
                boxShadow: `0 2px 8px ${token.colorPrimary}30`,
              }}
            >
              {userAvatar}
            </Avatar>

            {!isMobile && (
              <Space orientation="vertical" size={0} style={{ lineHeight: 1.2 }}>
                <Text strong style={{ fontSize: 13 }}>
                  {userName}
                </Text>
                <Text type="secondary" style={{ fontSize: 11 }}>
                  {userRole}
                </Text>
              </Space>
            )}

            {!isMobile && (
              <FaChevronDown
                style={{ fontSize: 10, color: token.colorTextSecondary }}
              />
            )}
          </div>
        </Dropdown>
      </Flex>
    </Header>
  );
};

export default Nav;
