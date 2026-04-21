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
} from "antd";

// ==================== Components ====================
import OpenDrawerBtn from "../Buttons/OpenDrawerBtn";
import Logo from "../Logo/Logo";
import DarkModeBtn from "../Buttons/DarkModeBtn";

// ==================== Icons ====================
import { FaRegUser } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
// ==================== React-router-dom ====================

import { useNavigate } from "react-router-dom";

const { Text } = Typography;
const { useBreakpoint } = Grid;

const Nav = () => {
  const screens = useBreakpoint();
  const { token } = theme.useToken();

  const isMobile = !screens.md;

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userName = user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : "User";
  const userRole = user.role || "Team Member";

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
        backdropFilter: "blur(10px)",
        padding: isMobile ? "0 12px" : "0 24px",
        height: "64px",
        transition: "all 0.3s ease",
      }}
    >
      {/* LEFT SECTION: Brand & Menu */}
      <Flex align="center" gap={isMobile ? 8 : 16}>
        {isMobile && <OpenDrawerBtn />}
        <Logo collapsed={isMobile} />
      </Flex>

      {/* RIGHT SECTION: Actions & User */}
      <Flex align="center" gap={isMobile ? 12 : 20}>
        {/* Responsive Greeting */}
        {!isMobile && (
          <div style={{ textAlign: "right", lineHeight: "1.2" }}>
            <Text
              strong
              style={{ display: "block", fontSize: "14px", color: "white" }}
            >
              {userName}
            </Text>
            <Text type="secondary" style={{ fontSize: "12px", color: "white" }}>
              {userRole}
            </Text>
          </div>
        )}

        <Flex align="center" gap={8}>
          <Tooltip title="Notifications">
            <Badge dot color={token.colorPrimary} offset={[-2, 4]}>
              <Button
                type="text"
                shape="circle"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                icon={
                  <IoIosNotificationsOutline
                    style={{ fontSize: 22, color: "white" }}
                  />
                }
                onClick={() => navigate(`/${role}/notifications`)}
              />
            </Badge>
          </Tooltip>

          <DarkModeBtn />

          <Tooltip title="Account Settings">
            <Avatar
              size={isMobile ? "default" : "large"}
              icon={<FaRegUser />}
              style={{
                cursor: "pointer",
                boxShadow: `0 2px 8px ${token.colorPrimary}40`,
              }}
              onClick={() => navigate("/admin/settings")}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </Header>
  );
};

export default Nav;
