import React from "react";
import { formatRegistrationDate } from "../../Utils/TimeFormatt";
import { Flex, Typography, Tag } from "antd";
import BackBtn from "../Buttons/BackBtn";
import {
  CalendarOutlined,
  ThunderboltOutlined,
  FlagOutlined,
} from "@ant-design/icons";
import TextSkelton from "../Skelton/TextSkelton";

const { Title, Text } = Typography;

const ProjectBox = ({ name, description, endDate }) => {
  const hasValidData = name && description && endDate;

  return (
    <>
      <Flex justify="end">
        <BackBtn />
      </Flex>

      {hasValidData ? (
        <div style={{ width: "100%" }}>
          {/* Hero Section - No Card, Just Content */}
          <div
            style={{
              padding: "48px 0 24px 0",
              borderBottom: "2px solid #f0f0f0",
            }}
          >
            {/* Icon Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "linear-gradient(135deg, #1890ff10, #722ed110)",
                padding: "6px 16px",
                borderRadius: 40,
                marginBottom: 24,
              }}
            >
              <ThunderboltOutlined style={{ color: "#1890ff", fontSize: 14 }} />
              <Text style={{ fontSize: 12, fontWeight: 500, color: "#1890ff" }}>
                ACTIVE PROJECT
              </Text>
            </div>

            {/* Project Name */}
            <Title
              level={1}
             
            >
              {name}
            </Title>

            {/* Description */}
            <Text
              style={{
                fontSize: 18,
                color: "#666",
                lineHeight: 1.6,
                display: "block",
                maxWidth: "80%",
                marginBottom: 24,
              }}
            >
              {description}
            </Text>

            {/* Deadline Badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 20px",
                borderRadius: 12,
                width: "fit-content",
              }}
            >
              <CalendarOutlined style={{ fontSize: 20, color: "#1890ff" }} />
              <div>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Deadline
                </Text>
                <Text strong style={{ fontSize: 16, display: "block" }}>
                  {formatRegistrationDate(endDate)}
                </Text>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <TextSkelton />
      )}
    </>
  );
};

export default ProjectBox;