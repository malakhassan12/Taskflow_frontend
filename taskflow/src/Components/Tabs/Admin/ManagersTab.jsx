import React, { useState, useEffect } from "react";
import ManagerModal from "../../Modals/Admin/ManagerModal";
import UsersTable from "../../Table/Admin/UsersTable";
import { getAllUsers } from "../../../Api/api/admin.api";

const ManagerTab = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  const [managerModalOpen, setManagerModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      const mappedData = Array.isArray(res) ? res.filter((user) => user.role === "ProjectManager").map((user) => ({
        id: user.id?.toString() || "",
        name: user.email?.split('@')[0] || user.email || "",
        email: user.email || "",
        phone: "",
        role: "manager",
        roleName: "Project Manager",
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
      console.error("Error fetching managers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (record) => {
    setSelectedManager(record);
    setManagerModalOpen(true);
  };

  return (
    <div>
      <UsersTable
        handleViewDetails={handleViewDetails}
        dataSource={dataSource}
        loading={loading}
      />
      {/* Manager Details Modal */}
      <ManagerModal
        viewModalOpen={managerModalOpen}
        setViewModalOpen={setManagerModalOpen}
        selectedManager={selectedManager}
      />
    </div>
  );
};

export default ManagerTab;
