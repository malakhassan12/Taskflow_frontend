import { PieChartOutlined } from "@ant-design/icons";

import { FaUserFriends } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { MdCreateNewFolder } from "react-icons/md";
import { LuFileSearch } from "react-icons/lu";
import {
  EyeOutlined,
  DeleteOutlined,
  CommentOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
import { Avatar, Button, Space, Tag } from "antd";
import { primaryColor } from "./Colors";

const managerMenu = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    label: <Link to="">DashBoard</Link>,
  },
  {
    key: "2",
    icon: <FaUserFriends />,
    label: <Link to="teams">Teams</Link>,
  },
  {
    key: "3",
    icon: <IoIosSettings />,
    label: <Link to="settings">Settings</Link>,
  },
  {
    key: "sub1",
    label: "Projects",
    icon: <FaFolderOpen />,
    children: [
      {
        key: "4",
        icon: <LuFileSearch />,
        label: <Link to="projects">All Projects</Link>,
      },
      {
        key: "5",
        icon: <MdCreateNewFolder />,
        label: <Link to="projects/create-project">Create Project</Link>,
      },
    ],
  },
];
const columns = [
  {
    title: "Project ID",
    dataIndex: "project_id",
    key: "project_id",
    width: 100,
    render: (text) => <Tag color="blue">#{text}</Tag>,
  },
  {
    title: "Project Name",
    dataIndex: "project_name",
    key: "project_name",
    width: 150,
    sorter: true,
  },
  {
    title: "Team Member",
    dataIndex: "name",
    key: "name",
    width: 180,
    render: (text) => (
      <Space>
        <Avatar size="small" style={{ backgroundColor: primaryColor }}>
          {text.charAt(0)}
        </Avatar>
        <Link>{text}</Link>
      </Space>
    ),
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    width: 130,
  },
  {
    title: "Tasks",
    dataIndex: "number_of_tasks",
    key: "number_of_tasks",
    width: 80,
    align: "center",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    width: 150,
    render: (tags) => (
      <Space size="small" wrap>
        {tags?.map((tag) => (
          <Tag key={tag} color="geekblue">
            {tag}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: "Actions",
    key: "action",
    width: 150,
    fixed: window.innerWidth >= 768 ? "right" : false,
    render: () => (
      <Space size="small">
        <Button type="link" icon={<EyeOutlined />} size="small">
          View
        </Button>
        <Button type="link" icon={<CommentOutlined />} size="small" />
        <Button type="link" icon={<DeleteOutlined />} size="small" danger />
      </Space>
    ),
  },
];

export { managerMenu, columns };
