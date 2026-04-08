// ==================== Ant Design  ====================
import {  Layout,  theme,  } from "antd";

// ==================== Components  ====================
import Nav from "../Components/Nav/Nav.jsx";
import SideBar from "../Components/SideBar/SideBar.jsx";
import DynamicBreadcrumb from "../Components/DynamicBreadCrumb/DynamicBreadCrumb.jsx";

// ==================== Constants  ====================

// ==================== react-router-dom  ====================

import { Outlet } from "react-router-dom";

const { Content,  } = Layout;

const ManagerLayout = () => {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Nav />
      <Layout>
       <SideBar colorBgContainer={colorBgContainer} />

        <Layout style={{ padding: "0 24px 24px" }}>
          <DynamicBreadcrumb/>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ManagerLayout;
