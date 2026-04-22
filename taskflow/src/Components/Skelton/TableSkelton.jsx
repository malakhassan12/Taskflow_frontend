import { Skeleton, Table, Card } from "antd";
import React from "react";

const TableSkeleton = ({ rows = 5 }) => {
  const data = Array.from({ length: rows }).map((_, i) => ({ key: i }));

  const columns = [
    {
      title: <Skeleton.Input active size="small" style={{ width: 60 }} />,
      dataIndex: "id",
      key: "id",
      width: 100,
      render: () => <Skeleton.Input active size="small" style={{ width: 50 }} />,
    },
    {
      title: <Skeleton.Input active size="small" style={{ width: 80 }} />,
      dataIndex: "name",
      key: "name",
      width: 150,
      render: () => <Skeleton.Input active size="small" style={{ width: 120 }} />,
    },
    {
      title: <Skeleton.Input active size="small" style={{ width: 60 }} />,
      dataIndex: "startDate",
      key: "startDate",
      width: 80,
      render: () => <Skeleton.Input active size="small" style={{ width: 70 }} />,
    },
    {
      title: <Skeleton.Input active size="small" style={{ width: 60 }} />,
      dataIndex: "endDate",
      key: "endDate",
      width: 80,
      render: () => <Skeleton.Input active size="small" style={{ width: 70 }} />,
    },
    {
      title: <Skeleton.Input active size="small" style={{ width: 50 }} />,
      key: "action",
      width: 150,
      render: () => (
        <div style={{ display: "flex", gap: 8 }}>
          <Skeleton.Button active size="small" />
          <Skeleton.Button active size="small" />
        </div>
      ),
    },
  ];

  return (
    <Card style={{ borderRadius: 12 }}>
      <Skeleton active paragraph={{ rows: 0 }} style={{ marginBottom: 16 }} />
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="key"
      />
    </Card>
  );
};

export default TableSkeleton;