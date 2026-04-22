import React from 'react';
import { Typography } from "antd";
import { RocketFilled } from "@ant-design/icons";
import { primaryColor } from '../../Constants/Colors';

const { Text } = Typography;

const Logo = ({ collapsed }) => {
  return (
    <div
      style={{
        padding: collapsed ? "16px 0" : "16px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "flex-start",
        transition: "all 0.2s",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <RocketFilled 
          style={{ 
            fontSize: collapsed ? 24 : 28, 
            color: primaryColor,
            transition: "all 0.2s",
          }} 
        />
        
        {!collapsed && (
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              margin: 0,
            }}
          >
            TaskFlow
          </Text>
        )}
      </div>
    </div>
  );
};

export default Logo;