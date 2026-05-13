import { Table } from 'antd';
import MemberColumns from '../Columns/MembersColumns';

const UsersTable = ({
  dataSource,
handleViewDetails
}) => {
  console.log(dataSource)

  return (
    <Table
      columns={MemberColumns(handleViewDetails)}
      dataSource={dataSource}
      scroll={{ x: 1000 }}
            rowKey="id"
      pagination={false}
      locale={{ emptyText: "No pending project requests" }}

    />
  );
};

export default UsersTable;