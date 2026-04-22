
const getTaskStatusColor = (status) => {
  const statusMap = {
    // Task statuses
    pending: "warning",
    "in-progress": "processing",
    completed: "success",
    rejected: "error",
    approved: "success",
    todo: "default",
    done: "success",
    active : "success",

    REJECTED: "error",
    APPROVED: "success",
    PENDING: "warning",
    // Default
    default: "default",
  };

  return statusMap[status?.toLowerCase()] || statusMap.default;
};

export default getTaskStatusColor;
