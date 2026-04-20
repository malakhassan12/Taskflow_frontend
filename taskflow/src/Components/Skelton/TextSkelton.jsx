import { Flex, Skeleton, Space, Splitter } from "antd";
import React from "react";

const TextSkelton = () => {
  return (
    <div style={{ padding: "24px",  borderRadius: "8px" }}>
      {/* Header section */}
      <Flex vertical gap="middle">
        {/* Title skeleton */}
        <div>
          <Skeleton.Input 
            active 
            size="large" 
            block 
            style={{ width: "60%", marginBottom: "16px" }} 
          />
        </div>

        {/* Divider effect */}
        <div style={{ height: "1px", background: "#e8e8e8", margin: "8px 0" }} />

       

        {/* Additional content rows */}
        <Space direction="vertical" size="small" style={{ width: "100%", marginTop: "16px" }}>
          <Skeleton active paragraph={{ rows: 2 }} title={false} />
          <Flex justify="space-between">
            <Skeleton.Input active size="small" style={{ width: "30%" }} />
            <Skeleton.Input active size="small" style={{ width: "20%" }} />
          </Flex>
        </Space>
      </Flex>
    </div>
  );
};

export default TextSkelton;