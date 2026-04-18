// src/utils/formatters.js
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const formatRegistrationDate = (dateString) => {
  if (!dateString) return "Not available";

  const date = dayjs(dateString);

  if (!date.isValid()) return "Invalid date";

  return date.format("DD MMM YYYY");
};

export const getTimeAgo = (dateString) => {
  if (!dateString) return "";
  return dayjs(dateString).fromNow();
};