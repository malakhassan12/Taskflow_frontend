import { message, Table } from "antd";

import Managerscolumns from "../Columns/ManagersColumns";
import useGetPendingRequests from "../../../Hooks/Admin/useGetPendingRequests";
import TableSkelton from "../../Skelton/TableSkelton";
import useAdminMutations from "../../../Hooks/Admin/useAdminMutations";

// ===== STATIC DATA =====

const ManagersRequestTable = ({ handleViewDetails }) => {
  // I will make loading page !!! and skeltons !

  const { data, isLoading } = useGetPendingRequests();

  console.log(data);

  const { approveManagerMutation, rejectManagerMutation } = useAdminMutations();
  const [messageApi, contextHolder] = message.useMessage();

  const handleApprove = (id) => {
    console.log(id);
    if (!id)
      messageApi.open({
        type: "warning",
        content: "Dont Exist Userid",
      });

    approveManagerMutation.mutate(id, {});
  };

  const handleReject = (id) => {
    if (!id)
      messageApi.open({
        type: "warning",
        content: "Dont Exist Userid",
      });

    rejectManagerMutation.mutate(id, {});
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
          pageSize: 10,
          showTotal: (total) => `Total ${total} items`,
        }}
        locale={{ emptyText: "No pending requests" }}
        scroll={{ x: 1000 }}
      />
    </>
  );
};

export default ManagersRequestTable;
