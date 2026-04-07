import {
  PieChartOutlined,
} from "@ant-design/icons";

import { FaUserFriends } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";

import { Link } from "react-router-dom";

const managerMenu = [
  { 
    key: "1", 
    icon: <PieChartOutlined />, 
    label: <Link to="">DashBoard</Link> 
  },
  { 
    key: "2", 
    icon: <FaUserFriends />, 
    label: <Link to="teams">Teams</Link> 
  },
  { 
    key: "3", 
    icon: <IoIosSettings />, 
    label: <Link to="settings">Settings</Link> 
  },
  {
    key: "sub1",
    label: "Projects", 
    icon: <FaFolderOpen />,
    children: [
      { 
        key: "4", 
        label: <Link to="projects">All Projects</Link> 
      },
      { 
        key: "5", 
        label: <Link to="projects/create-project">Create Project</Link> 
      },
      
    ],
  },
];




export { managerMenu };
