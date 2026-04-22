import { useState, useMemo } from "react";

const useSearch = (data = [], searchFields = []) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    
    return data.filter((item) =>
      searchFields.some((field) => {
        const value = item[field];
        return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [data, searchTerm, searchFields]);

  return { searchTerm, setSearchTerm, filteredData };
};

export default useSearch;



// // Transform API data to table format
//   const transformedData =
//     teamsData?.map((item, index) => ({
//       key: item.teamMemberId || index,
//       project_id: item.projectCode,
//       project_name: item.projectName,
//       name: item.teamMemberName,
//       teamMemberId: item.teamMemberId,
//       phone: item.phone || "Not provided",
//       number_of_tasks: item.tasksCount,
//       completed_tasks: item.completedTasks || 0,
//       tags: item.tags || ["team-member"],
//       status: item.status || "active",
//     })) || [];

 

//   const { _, setSearchTerm, filteredData } = useSearch(
//     transformedData,
//     ["name", "project_name"],
//   );