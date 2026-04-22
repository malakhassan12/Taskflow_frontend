// ==================== Ant Design ====================
import { Layout, Menu, Typography, Grid } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
// ==================== React ====================
// ==================== React-router-dom ====================

const { Sider } = Layout;
const { Text } = Typography;
const { useBreakpoint } = Grid;

const SideBar = ({ colorBgContainer, items, selectedKey }) => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  // Auto collapse on mobile

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth={isMobile ? 0 : 80}
      width={250}
      style={{
        background: colorBgContainer,
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        insetInlineStart: 0,
        top: 0,
        scrollbarWidth: "thin",
        scrollbarGutter: "stable",
        boxShadow: "1px 0 8px rgba(0, 0, 0, 0.05)",
        transition: "all 0.2s ease",
        paddingTop: "5rem",
      }}
      trigger={null}
    >
      {/* Menu */}
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        defaultOpenKeys={["sub1"]}
        style={{
          height: "calc(100% - 64px)",
          borderInlineEnd: 0,
          background: "transparent",
          padding: "8px 0",
        }}
        items={items}
      />

    </Sider>
  );
};

export default SideBar;
