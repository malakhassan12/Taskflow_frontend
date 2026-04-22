const getTaskStatusText = (status) => {
  const statusMap = {
    // Task statuses
    pending: "Pending",
    in_progress: "In Progress",
    completed: "Completed",
    rejected: "Rejected",
    approved: "Approved",
    todo: "To Do",
    done: "Done",
    REJECTED: "Rejected",
    APPROVED: "Approved",
    PENDING: "Pending",
    active: "Active",

    // Default
    default: "Unknown",
  };

  return statusMap[status?.toLowerCase()] || status || statusMap.default;
};

export default getTaskStatusText;
