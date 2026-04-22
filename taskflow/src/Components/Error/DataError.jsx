import { Card, Empty } from "antd";
import React from "react";

const DataError = ({ item }) => {
  return (
    <Card style={{ borderRadius: "12px", textAlign: "center", padding: 40 }}>
      <Empty description={`Failed to load ${item} data`} />
    </Card>
  );
};

export default DataError;
