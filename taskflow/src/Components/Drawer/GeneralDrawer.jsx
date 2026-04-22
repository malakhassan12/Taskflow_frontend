// ==================== Ant Design ====================
import Drawer from "antd/es/drawer";
import "antd/es/drawer/style";
import { Menu, Typography, Avatar, Space, Divider } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import SideBar from "../SideBar/SideBar";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

// Import role-based menus
import { managerMenu } from "../../Constants/ManagerConstants";
import { adminMenu } from "../../Constants/AdminConstants";
import { memberMenu } from "../../Constants/MemberConstants";
// import { memberMenu } from "../../Constants/Menus/memberMenu";

const { Text } = Typography;

const GeneralDrawer = ({ open, setOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const role = user?.role?.toLowerCase();

  // Get menu based on role
  const getMenuByRole = () => {
    switch (role) {
      case "projectmanager":
      case "manager":
        return managerMenu;
      case "admin":
        return adminMenu;
      case "teammember":
      case "member":
        return memberMenu;
      default:
        return managerMenu;
    }
  };

  const menuItems = getMenuByRole();
  const userName = user?.firstName && user?.lastName 
    ? `${user.firstName} ${user.lastName}` 
    : user?.name || "User";
  const userRole = user?.role || "Team Member";
  const userEmail = user?.email || "";

  const handleMenuClick = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      placement="left"
      onClose={onClose}
      open={open}
      size={280}
      styles={{
        body: {
          padding: 0,
        },
      }}
      closable={false}
    >
      {/* User Profile Section */}
      <div
        style={{
          padding: "24px 16px",
          textAlign: "center",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <Avatar
          size={64}
          icon={<UserOutlined />}
          style={{
            backgroundColor: "#1890ff",
            marginBottom: 12,
          }}
        />
        <div>
          <Text strong style={{ fontSize: 16, display: "block" }}>
            {userName}
          </Text>
          <Text type="secondary" style={{ fontSize: 12, display: "block" }}>
            {userRole}
          </Text>
          {userEmail && (
            <Text type="secondary" style={{ fontSize: 11, display: "block" }}>
              {userEmail}
            </Text>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <Menu
        mode="inline"
        items={menuItems}
        onClick={handleMenuClick}
        style={{
          borderRight: "none",
          padding: "8px 0",
        }}
      />

      <Divider style={{ margin: "8px 0" }} />

      {/* Logout Button */}
      <div style={{ padding: "16px" }}>
        <Menu
          mode="inline"
          items={[
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: "Logout",
              danger: true,
              onClick: handleLogout,
            },
          ]}
          style={{ borderRight: "none" }}
        />
      </div>
    </Drawer>
  );
};

export default GeneralDrawer;