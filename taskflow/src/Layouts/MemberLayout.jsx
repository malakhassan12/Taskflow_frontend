import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import MemberNavbar from "../Components/Member/Layout/MemberNavbar";
import MemberSidebar from "../Components/Member/Layout/MemberSidebar";
import SideBar from "../Components/SideBar/SideBar";
import { memberMenu } from "../Constants/MemberConstants";
import { Layout, theme } from "antd";
import Nav from "../Components/Nav/Nav";
import DynamicBreadcrumb from "../Components/DynamicBreadCrumb/DynamicBreadCrumb";
import { Content } from "antd/es/layout/layout";
import GetSelectedKeyMember from "../Functions/Member/GetSelectedKeyMember";

const MemberLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  console.log(theme.useToken());

  const location = useLocation();

  const selectedKey = GetSelectedKeyMember(location.pathname) || "1";
  return (
    <Layout>
      <Nav />
      <Layout>
        <SideBar
          colorBgContainer={colorBgContainer}
          items={memberMenu}
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

export default MemberLayout;
