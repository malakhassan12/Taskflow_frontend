import { Link } from "react-router-dom";

// ==================== Icons ====================
import { 
  PieChartOutlined, 
  SettingOutlined, 
} from "@ant-design/icons";

import { FaUserFriends, FaFolderOpen, FaUserCheck } from "react-icons/fa";
import {  IoMdGitPullRequest } from "react-icons/io";

const adminMenu = [
  {
    key: "1",
    icon: <PieChartOutlined style={{ fontSize: '18px' }} />,
    label: <Link to="">Dashboard</Link>,
  },
  {
    type: 'divider', 
  },
  {
    key: "grp-management",
    label: "Management",
    type: "group", 
    children: [
      {
        key: "2",
        icon: <FaUserFriends />,
        label: <Link to="users">Users List</Link>,
      },
      {
        key: "6",
        icon: <FaFolderOpen />,
        label: <Link to="projects">All Projects</Link>,
      },
    ],
  },
  {
    key: "grp-requests",
    label: "Pending Approvals",
    type: "group",
    children: [
      {
        key: "3",
        icon: <FaUserCheck />,
        label: <Link to="managers">Manager Requests</Link>,
      },
      {
        key: "4",
        icon: <IoMdGitPullRequest />, 
        label: <Link to="project-requests">Project Requests</Link>,
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: "5",
    icon: <SettingOutlined />, 
    label: <Link to="settings">General Settings</Link>,
  },
];




export { adminMenu };