import  { useState, useEffect } from "react";
import UsersTable from "../../Table/Admin/UsersTable";
import MemberModal from "../../Modals/Admin/MemberModal";
import { getAllUsers } from "../../../Api/api/admin.api";

const MembersTab = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      const mappedData = Array.isArray(res) ? res.filter((user) => user.role === "TeamMember").map((user) => ({
        id: user.id?.toString() || "",
        name: user.email?.split('@')[0] || user.email || "",
        email: user.email || "",
        phone: "",
        role: "member",
        roleName: "Team Member",
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
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (record) => {
    setSelectedMember(record);
    setMemberModalOpen(true);
  };

  return (
    <div>
      <MemberModal
        viewModalOpen={memberModalOpen}
        setViewModalOpen={setMemberModalOpen}
        selectedMember={selectedMember}
      />
      <UsersTable
        handleViewDetails={handleViewDetails}
        dataSource={dataSource}
        loading={loading}
      />
    </div>
  );
};

export default MembersTab;
