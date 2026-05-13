import { Card, Spin } from "antd";
import React from "react";

const DataLoad = ({ item }) => {
  return (
    <Card
      style={{
        borderRadius: "12px",
        textAlign: "center",
        padding: 40,
        width: "100%",
        height: "100%",
      }}
    >
      <Spin size="large" description={`Loading ${item} data...`} />
    </Card>
  );
};

export default DataLoad;
