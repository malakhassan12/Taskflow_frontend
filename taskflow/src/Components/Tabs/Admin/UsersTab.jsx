import React, { useState, useEffect } from "react";
import ManagerModal from "../../Modals/Admin/ManagerModal";
import MemberModal from "../../Modals/Admin/MemberModal";
import UsersTable from "../../Table/Admin/UsersTable";
import { getAllUsers } from "../../../Api/api/admin.api";

const UsersTab = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedMemeber, setSelectedMemeber] = useState(null);
  const [memberModalOpen, setMemberModalOpen] = useState(false);

  const [managerModalOpen, setManagerModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      const mappedData = Array.isArray(res) ? res.map((user) => ({
        id: user.id?.toString() || "",
        name: user.email?.split('@')[0] || user.email || "",
        email: user.email || "",
        phone: "",
        role: user.role === "ProjectManager" ? "manager" : user.role === "TeamMember" ? "member" : user.role?.toLowerCase() || "member",
        roleName: user.role || "User",
        status: "active",
        registeredDate: "",
        lastActive: "",
        company: "",
        experience: "",
        projectsCount: user.projects?.length || 0,
        avatarColor: "#1890ff",
        bio: "",
      })) : [];
      setDataSource(mappedData);
    } catch (error) {
      console.error("Error fetching all users:", error);
    } finally {
      setLoading(false);
    }
  };

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
        loading={loading}
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
