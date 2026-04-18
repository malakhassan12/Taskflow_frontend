import { message, Table } from "antd";

import Managerscolumns from "../Columns/ManagersColumns";
import useGetAllManagersByStatus from "../../../Hooks/Admin/useGetAllManagersByStatus";
import TableSkelton from "../../Skelton/TableSkelton";
import useAdminMutations from "../../../Hooks/Admin/useAdminMutations";
const AllManagersTable = ({ handleViewDetails }) => {
  const { data: approvedData, isLoading: isLoadingApproved } =
    useGetAllManagersByStatus(true);

  const { data: rejectedData, isLoading: isLoadingRejected } =
    useGetAllManagersByStatus(false);

  const data =
    approvedData && rejectedData ? [...approvedData, ...rejectedData] : [];
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

  if (isLoadingApproved || isLoadingRejected) {
    return <TableSkelton />;
  }
  console.log(data);
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
