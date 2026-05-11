import { Table } from "antd";
import ProjectsColumns from "../Columns/ProjectsColumns";
import { getAllProjects } from "../../../Api/api/manager.api";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

const AllProjectsTable = forwardRef(({
  handleViewProjectDetails,
  handleViewManagerDetails,
  handleApprove,
  handleReject,
}, ref) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useImperativeHandle(ref, () => ({
    refresh: fetchAllProjects,
  }));

  useEffect(() => {
    fetchAllProjects();
  }, []);

  const fetchAllProjects = async () => {
    try {
      setLoading(true);
      const res = await getAllProjects();
      console.log("API Response:", res);
      const projectsArray = Array.isArray(res) ? res : res?.data || [];

      const mappedData = projectsArray.map((project) => ({
        id: project.id?.toString() || "",
        name: project.name || "",
        projectManager: project.manegerName || "",
        projectManagerId: project.manegerID?.toString() || "",
        members: [],
        numOfMembers: 0,
        status: "active",
        submittedDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : "",
        desc: project.description || "",
        startTime: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : "",
        endTime: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : "",
      }));

      console.log("Mapped Data:", mappedData);
      setData(mappedData);
    } catch (error) {
      console.error("Error fetching all projects:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Table
      columns={ProjectsColumns(
        handleViewProjectDetails,
        handleViewManagerDetails,
        handleApprove,
        handleReject,
      )}
      dataSource={data}
      rowKey="id"
      loading={loading}
      pagination={false}
      locale={{ emptyText: "No projects found" }}
      scroll={{ x: 800 }}
    />
  );
});

AllProjectsTable.displayName = "AllProjectsTable";

export default AllProjectsTable;
