import { lazy, Suspense } from "react";

// ==================== Ant Design  ====================

import Tabs from "antd/es/tabs";
import "antd/es/tabs/style";
import { Spin } from "antd";
// ==================== Components  ====================
const ProjectCards = lazy(() => import("../../Cards/ProjectCards"));

const ManagerTeams = lazy(() => import("../../Analytics/ManagerTeams"));
const ManagerAVGTasks = lazy(() => import("../../Analytics/ManagerAVGTasks"));
const onChange = (key) => {
  console.log(key);
};
const items = [
  { key: "1", label: "Your Projects", children: <ProjectCards /> },
  { key: "2", label: "Team Performance", children: <ManagerTeams /> },
  { key: "3", label: "Analytics", children: <ManagerAVGTasks /> },
];
const LoadingFallback = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: 400,
    }}
  >
    <Spin size="large" description="Loading..." />
  </div>
);
const ManagerTabs = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </Suspense>
  );
};
export default ManagerTabs;
