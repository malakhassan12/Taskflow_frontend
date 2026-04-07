// ==================== Constants  ====================

import { managerMenu } from "../../Constants/ManagerConstants";
// ==================== Ant Design  ====================

import Sider from "antd/es/layout/Sider.js";
import Menu from "antd/es/menu";
import "antd/es/menu/style";
const SideBar = ({ colorBgContainer }) => {
  return (
    <Sider
      breakpoint="md"
      collapsedWidth="0"
      width={200}
      style={{
        background: colorBgContainer,
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        insetInlineStart: 0,
        top: 0,
        scrollbarWidth: "thin",
        scrollbarGutter: "stable",
      }}
    >
      {" "}
      <div className="demo-logo-vertical" />
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderInlineEnd: 0, marginTop: "4rem" }}
        items={managerMenu}
        styles={{
          marginTop: "1rem",
        }}
      />
    </Sider>
  );
};

export default SideBar;
