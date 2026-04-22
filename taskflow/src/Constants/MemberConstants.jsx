import {
  HomeOutlined,
  InboxOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const memberMenu = [
  {
    key: "1",
    label: <Link to="">My Dash</Link>,
    icon: <HomeOutlined />,
  },
  {
    key: "2",
    label: <Link to="view-requests">View requests</Link>,
    icon: <SettingOutlined />,
  },
  {
    key: "3",
    label: <Link to="settings">Settings</Link>,
    icon: <InboxOutlined />,
  },
];

export { memberMenu };
