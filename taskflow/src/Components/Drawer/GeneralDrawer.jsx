// ==================== Ant Design  ====================

import { Drawer } from "antd";

const GeneralDrawer = ({ open, setOpen }) => {
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Drawer
        title="Basic Drawer"
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default GeneralDrawer;
