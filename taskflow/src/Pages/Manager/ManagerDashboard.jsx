import { lazy } from "react";

// ==================== Ant Design  ====================

import Button from "antd/es/button";
import "antd/es/button/style";

import Flex from "antd/es/flex";
import "antd/es/flex/style";

import Typography from "antd/es/typography";
import "antd/es/typography/style";
const { Title, Paragraph } = Typography;

// ==================== Icons  ====================

import { IoIosAdd } from "react-icons/io";
// ==================== Constants  ====================

import { primaryColor } from "../../Constants/Colors";
// ==================== Components  ====================

const ManagerCards = lazy(() => import("../../Components/Cards/ManagerCards"));

const ManagerTabs = lazy(() => import("../../Components/Tabs/ManagerTabs"));

const ManagerDashboard = () => {
  return (
    <>
      <Flex className="flex justify-between">
        <div>
          <Title level={2} className="font-bold">
            Project Dashboard
          </Title>
          <Paragraph>
            Manage your projects, track progress, and analyze performance
          </Paragraph>
        </div>

        <div>
          <Button className={`bg-[${primaryColor}]`} icon={<IoIosAdd />}>
            Create Project
          </Button>
        </div>
      </Flex>

      <div>
        <ManagerCards />
      </div>

      <div>
        <ManagerTabs />
      </div>
    </>
  );
};

export default ManagerDashboard;
