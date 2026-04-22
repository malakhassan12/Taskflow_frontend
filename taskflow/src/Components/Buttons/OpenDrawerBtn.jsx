// ==================== Ant Design ====================
import { Button, Tooltip } from "antd";
import { MenuOutlined } from "@ant-design/icons";
// ==================== REACT ====================
import { useState } from "react";
// ==================== Components ====================
import GeneralDrawer from "../Drawer/GeneralDrawer";

const OpenDrawerBtn = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  return (
    <>
      <Tooltip title="Menu" placement="bottom">
        <Button
          type="text"
          onClick={showDrawer}
          icon={<MenuOutlined />}
          style={{
            fontSize: "18px",
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
            transition: "all 0.3s ease",
          }}
        />
      </Tooltip>

      <GeneralDrawer open={open} setOpen={setOpen} />
    </>
  );
};

export default OpenDrawerBtn;