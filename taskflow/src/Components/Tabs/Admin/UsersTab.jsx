import React, { useState, useEffect } from "react";
import { message } from "antd";

import UsersTable from "../../Table/Admin/UsersTable";
import UserModal from "../../Modals/User/UserModal";

import { getAllUsers } from "../../../Api/api/admin.api";

const UsersTab = () => {

  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [open, setOpen] = useState(false);

  // Selected User
  const [selectedMember, setSelectedMember] =
    useState(null);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {

    try {

      setLoading(true);

      const res = await getAllUsers();

      const mappedData = Array.isArray(res)
        ? res
            .filter(
              (user) =>
                user.role === "TeamMember" ||
                user.role === "ProjectManager"
            )

            .map((user) => ({
              id: user.id,

              name:
                user.email?.split("@")[0] ||
                "User",

              email: user.email,

              role:
                user.role === "TeamMember"
                  ? "Team Member"
                  : "Project Manager",

              projectsCount:
                user.projects?.length || 0,

              tasksCount:
                user.tasks?.length || 0,

              notificationsCount:
                user.notifications?.length || 0,

              // Keep original user
              originalUser: user,
            }))
        : [];

      setDataSource(mappedData);

    } catch (error) {

      console.error(
        "Error fetching users:",
        error
      );

      message.error(
        "Failed to load users"
      );

    } finally {

      setLoading(false);
    }
  };

  // View Details
  const handleViewDetails = (record) => {

    console.log("Selected User:", record);

    setSelectedMember(record);

    setOpen(true);
  };

  return (
    <>

      {/* User Modal */}
      <UserModal
        open={open}
        setOpen={setOpen}
        selectedMember={selectedMember}
      />

      {/* Users Table */}
      <UsersTable
        handleViewDetails={
          handleViewDetails
        }

        dataSource={dataSource}

        loading={loading}
      />
    </>
  );
};

export default UsersTab;