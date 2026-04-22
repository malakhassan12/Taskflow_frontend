const getStatusText = (status) => {
    const texts = {
      pending: "Pending",
      "in-progress": "In Progress",
      completed: "Completed",
      rejected: "Rejected",
      todo : "todo"
    };
    return texts[status] || status;
  };


  export default getStatusText;