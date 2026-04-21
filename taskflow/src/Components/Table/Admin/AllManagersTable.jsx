import { message, Table } from "antd";
import { useState, useEffect } from "react";

import Managerscolumns from "../Columns/ManagersColumns";
import { getAllUsers } from "../../../Api/api/admin.api";
import { approveUser, rejectUser } from "../../../Api/api/manager.api";
import TableSkelton from "../../Skelton/TableSkelton";

const AllManagersTable = ({ handleViewDetails }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      setIsLoading(true);
      const res = await getAllUsers();
      const mappedData = Array.isArray(res) ? res.map((user) => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        company: "",
        role: user.role,
        status: user.isApproved ? "approved" : "pending",
        registeredDate: user.createdAT ? new Date(user.createdAT).toISOString().split('T')[0] : "",
      })) : [];
      setData(mappedData);
    } catch (error) {
      console.error("Error fetching all users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveUser(id);
      messageApi.open({
        type: "success",
        content: "Manager approved successfully",
      });
      fetchAllUsers();
    } catch (error) {
      console.error("Error approving manager:", error);
      messageApi.open({
        type: "error",
        content: "Failed to approve manager",
      });
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectUser(id);
      messageApi.open({
        type: "warning",
        content: "Manager rejected successfully",
      });
      fetchAllUsers();
    } catch (error) {
      console.error("Error rejecting manager:", error);
      messageApi.open({
        type: "error",
        content: "Failed to reject manager",
      });
    }
  };

  if (isLoading) {
    return <TableSkelton />;
  }

  return (
    <>
      {contextHolder}
      <Table
        columns={Managerscolumns(
          handleViewDetails,
          handleApprove,
          handleReject,
        )}
        dataSource={data || []}
        rowKey="id"
        pagination={{
          pageSize: 5,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} managers`,
        }}
        scroll={{ x: 800 }}
      />
    </>
  );
};

export default AllManagersTable;
