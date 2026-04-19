import React from "react";
import { useTheme } from "../../../Context/DarkModeProvider";

const ProjectFilter = ({ activeFilter, onChange }) => {
  const { isDarkMode } = useTheme();
  const filters = [
    { value: "All", label: "All" },
    { value: "active", label: "Active" },
    { value: "planning", label: "Planning" },
  ];

  return (
    <div className={`inline-flex rounded-lg p-1 ${isDarkMode ? "bg-slate-800" : "bg-slate-100"}`}>
      {filters.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value)}
          className={`rounded-md px-3 py-1.5 text-xs font-medium ${
            activeFilter === value
              ? isDarkMode
                ? "bg-slate-700 text-slate-100 shadow-sm"
                : "bg-white text-slate-800 shadow-sm"
              : isDarkMode
                ? "text-slate-300"
                : "text-slate-600"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default ProjectFilter;
