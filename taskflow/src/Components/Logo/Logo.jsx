import React from 'react';
import { Typography, Space } from "antd";
import { RocketFilled } from "@ant-design/icons"; 
import { primaryColor } from '../../Constants/Colors';

const { Text } = Typography;

const Logo = ({ collapsed }) => {
  return (
    <div style={{
      padding: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: collapsed ? "center" : "flex-start",
      transition: "all 0.3s",
      overflow: "hidden"
    }}>
      <Space size="middle">
        <div style={{
          width: "32px",
          height: "32px",
          backgroundColor: primaryColor,
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 10px rgba(24, 144, 255, 0.3)"
        }}>
          <RocketFilled style={{ fontSize: "18px", color: "#fff" }} />
        </div>

        {!collapsed && (
          <Text
            style={{
              fontSize: "20px",
              fontWeight: "800",
              color: "#fff", 
              letterSpacing: "0.5px",
              fontFamily: "'Inter', sans-serif"
            }}
          >
            Task<span style={{ color: "#1890ff" }}>Nova</span>
          </Text>
        )}
      </Space>
    </div>
  );
};

export default Logo;