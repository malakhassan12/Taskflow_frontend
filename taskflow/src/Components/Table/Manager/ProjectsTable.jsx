// ==================== Ant Design   ====================

import { Divider, Flex, Table } from "antd";
import { Avatar, Button, Space, Tag } from "antd";

import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

// ==================== React-router-dom  ====================

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DeleteProjectModal from "../../Modals/DeleteProjectModal";
import useGetProjects from "../../../Hooks/Manager/useGetProjects";
import { formatRegistrationDate } from "../../../Utils/TimeFormatt";

import TableSkelton from "../../Skelton/TableSkelton";
import ManagerProjectsColumns from "../Columns/ManagerProjectsColumns";
import SearchBar from "../../Search/SearchBar";
import useSearch from "../../../Context/SearchContext";
// ==================== Components  ====================

const ProjectsTable = () => {
  const navigate = useNavigate();
  const { data = [], isLoading } = useGetProjects();

  console.log(data);

 

  const { _, setSearchTerm, filteredData } = useSearch(data, ["name"]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleDeleteClick = (project) => {
    setSelectedProject(project);
    setIsDeleteModalOpen(true);
  };

  const moko = data?.map((item) => ({
    ...item,
    endDate: formatRegistrationDate(item.endDate),
    startDate: formatRegistrationDate(item.startDate),
  }));

  if (isLoading) {
    return <TableSkelton />;
  }
  return (
    <div>
      {isDeleteModalOpen && (
        <DeleteProjectModal
          open={isDeleteModalOpen}
          setOpen={setIsDeleteModalOpen}
          project={selectedProject}
        />
      )}
      <Flex justify="end">
        <SearchBar
          onSearch={setSearchTerm}
          placeholder="Search project name"
        />{" "}
      </Flex>

      <Divider />
      <div data-aos="zoom-in">
        <Table
          columns={ManagerProjectsColumns(handleDeleteClick, navigate)}
          dataSource={filteredData || moko}
          scroll={{ x: 1000 }}
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Total ${total} items`,
          }}
        />
      </div>
    </div>
  );
};

export default ProjectsTable;
