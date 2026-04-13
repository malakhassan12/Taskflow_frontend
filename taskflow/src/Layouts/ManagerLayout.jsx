// ==================== Ant Design  ====================
import { Layout, theme } from "antd";

// ==================== Components  ====================
import Nav from "../Components/Nav/Nav.jsx";
import SideBar from "../Components/SideBar/SideBar.jsx";
import DynamicBreadcrumb from "../Components/DynamicBreadCrumb/DynamicBreadCrumb.jsx";

// ==================== Constants  ====================

import { managerMenu } from "../Constants/ManagerConstants";

// ==================== react-router-dom  ====================

import { Outlet, useLocation } from "react-router-dom";
import GetSelectedKeyManager from "../Functions/Manager/GetSelectedKeyManager.js";

const { Content } = Layout;

const ManagerLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  console.log(theme.useToken());

  const location = useLocation();

  const selectedKey = GetSelectedKeyManager(location.pathname) || "1";

  return (
    <Layout>
      <Nav />
      <Layout>
        <SideBar
          colorBgContainer={colorBgContainer}
          items={managerMenu}
          selectedKey={selectedKey}
        />

        <Layout style={{ padding: "0 24px 24px" }}>
          <DynamicBreadcrumb />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div data-aos="fade-up" data-aos-anchor-placement="top-center">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ManagerLayout;
