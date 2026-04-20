import React from "react";
import { formatRegistrationDate } from "../../Utils/TimeFormatt";
import { Flex, Space, Tag, Typography } from "antd"; // Fixed import
import BackBtn from "../Buttons/BackBtn";
import {  // Fixed Title import - it should be from Typography, not skeleton
  CalendarOutlined,
} from "@ant-design/icons";
import TextSkelton from "../Skelton/TextSkelton";

const { Title, Text } = Typography; // Correct way to import Title and Text

const ProjectBox = ({ name, description, endDate }) => {
  // Check if all required props exist and are valid
  const hasValidData = name && description && endDate;

  return (
    <>
      {hasValidData ? (
        <Space direction="vertical" size="middle" style={{ width: "100%" }}> {/* Changed size to "middle" */}
          <Flex justify="end">
            <BackBtn />
          </Flex>
          <Title level={2} style={{ margin: "16px 0 8px 0" }}>
            {name}
          </Title>
          <Text
            type="secondary"
            style={{ maxWidth: "600px", display: "block" }}
          >
            {description}
          </Text>
          <Tag
            icon={<CalendarOutlined />}
            color="blue"
            style={{ marginTop: "8px" }}
          >
            Deadline: {formatRegistrationDate(endDate)}
          </Tag>
        </Space>
      ) : (
        <TextSkelton />
      )}
    </>
  );
};

export default ProjectBox;