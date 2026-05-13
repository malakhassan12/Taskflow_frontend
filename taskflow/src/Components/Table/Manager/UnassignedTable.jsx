import React from "react";
import { Table } from "antd";
import unassignedTasksColumns from "../Columns/UnassignedColumns";

const UnassignedTable = ({ unassignedTasks, tasksLoading }) => {
  const isLoading = tasksLoading;
  return (
    <>
      <Table
        columns={unassignedTasksColumns()}
        dataSource={unassignedTasks}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1000 }}
        locale={{
          emptyText: "All tasks are assigned! Great job!",
        }}
      />
    </>
  );
};

export default UnassignedTable;
