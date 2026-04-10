import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../Context/DarkModeProvider";

import { Header } from "antd/es/layout/layout";
import { Grid, Avatar, Typography, Tooltip, Button, Flex } from "antd";

// ==================== Components  ====================

import DarkModeBtn from "../../Buttons/DarkModeBtn";

// ==================== Icons  ====================

import { FaRegUser } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
// ==================== Constants  ====================

const MemberNavbar = ({ memberName = "Emma" }) => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  return (
    <header
      className={`sticky top-0 z-10 flex h-16 items-center justify-between border-b px-4 md:px-8 ${
        isDarkMode
          ? "border-slate-700 bg-slate-950"
          : "border-slate-200 bg-white"
      }`}
    >
      <h1
        className={`text-sm font-medium md:text-base ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}
      >
        Welcome back, {memberName}!
      </h1>

      <div className="flex items-center gap-2 md:gap-3">
        <Flex align="center" gap={20}>
          <Tooltip title="Notifications">
            <Button
              type="text"
              shape="circle"
              icon={<IoIosNotificationsOutline style={{ fontSize: 20 }} />}
              onClick={() => navigate("/member/notifications")}
            />
          </Tooltip>

          <Tooltip title="Profile">
            <Avatar
              icon={<FaRegUser />}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/member/settings")} 
            />
          </Tooltip>

          <DarkModeBtn />
        </Flex>
      </div>
    </header>
  );
};

export default MemberNavbar;
