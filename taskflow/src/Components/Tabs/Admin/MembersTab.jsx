import React, { useState, useEffect } from "react";
import UsersTable from "../../Table/Admin/UsersTable";
import UserModal from "../../Modals/User/UserModal";
import { getAllUsers } from "../../../Api/api/admin.api";
import { message } from "antd";

const MembersTab = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);

      const res = await getAllUsers();

      const mappedData = Array.isArray(res)
        ? res
            .filter((user) => user.role === "TeamMember")
            .map((user) => ({
              id: user.id,
              name: user.email?.split("@")[0] || "User",
              email: user.email,
              role: "Team Member",
              projectsCount: user.projects?.length || 0,
              tasksCount: user.tasks?.length || 0,
              notificationsCount:
                user.notifications?.length || 0,
            }))
        : [];

      setDataSource(mappedData);
    } catch (error) {
      console.error(error);
      message.error("Failed to load members");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (record) => {
    setSelectedMember(record);
    setOpen(true);
  };

  return (
    <div>
      <UsersTable
        handleViewDetails={handleViewDetails}
        dataSource={dataSource}
        loading={loading}
      />

      <UserModal
        open={open}
        setOpen={setOpen}
        selectedMember={selectedMember}
      />
    </div>
  );
};

export default MembersTab;