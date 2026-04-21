import { Table } from "antd";
import ProjectsColumns from "../Columns/ProjectsColumns";
import { getProjects } from "../../../Api/api/manager.api";
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
      const res = await getProjects(1, 1000);
      const mappedData = Array.isArray(res) ? res.map((project) => ({
        id: project.id?.toString() || "",
        name: project.name || "",
        projectManager: project.maneger
          ? `${project.maneger.firstName} ${project.maneger.lastName}`
          : "",
        projectManagerId: project.manegerID?.toString() || "",
        members: project.users?.map((u) => u.firstName) || [],
        numOfMembers: project.users?.length || 0,
        status: project.status?.toLowerCase() || "pending",
        submittedDate: project.createdAt ? new Date(project.createdAt).toISOString().split('T')[0] : "",
        desc: project.description || "",
        startTime: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : "",
        endTime: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : "",
      })) : [];
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
