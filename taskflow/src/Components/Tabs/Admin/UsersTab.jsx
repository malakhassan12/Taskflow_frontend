import React, { useState } from "react";
import ManagerModal from "../../Modals/Admin/ManagerModal";
import MemberModal from "../../Modals/Admin/MemberModal";
import UsersTable from "../../Table/Admin/UsersTable";

const UsersTab = () => {
  const dataSource = [];

  const [selectedMemeber, setSelectedMemeber] = useState(null);
  const [memberModalOpen, setMemberModalOpen] = useState(false);

  const [managerModalOpen, setManagerModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);

  const handleViewDetails = (record) => {
    if (record.role == "member") {
      setSelectedMemeber(record);
      setMemberModalOpen(true);
    } else {
      setSelectedManager(record);
      setManagerModalOpen(true);
    }
  };
  return (
    <>
      <UsersTable
        handleViewDetails={handleViewDetails}
        dataSource={dataSource}
      />
      <ManagerModal
        viewModalOpen={managerModalOpen}
        setViewModalOpen={setManagerModalOpen}
        selectedManager={selectedManager}
      />

      <MemberModal
        viewModalOpen={memberModalOpen}
        setViewModalOpen={setMemberModalOpen}
        selectedMemeber={selectedMemeber}
      />
    </>
  );
};

export default UsersTab;
