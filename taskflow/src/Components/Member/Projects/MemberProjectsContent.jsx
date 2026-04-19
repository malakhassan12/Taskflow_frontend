import React, { useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectFilter from "./ProjectFilter";
import { useTheme } from "../../../Context/DarkModeProvider";
import { MEMBER_PROJECTS_DEMO } from "../../../Data/memberProjectsDemo";

const MemberProjectsContent = () => {
  // Route `/member/projects`: default to Active only (use filter to see All / Planning)
  const [activeFilter, setActiveFilter] = useState("active");
  const { isDarkMode } = useTheme();

  const visibleProjects = useMemo(() => {
    if (activeFilter === "All") {
      return MEMBER_PROJECTS_DEMO;
    }
    return MEMBER_PROJECTS_DEMO.filter(
      (project) => project.status.toLowerCase() === activeFilter.toLowerCase(),
    );
  }, [activeFilter]);

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className={`text-4xl font-bold ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>My Projects</h2>
          <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>View and track all projects you&apos;re part of</p>
        </div>
        <ProjectFilter activeFilter={activeFilter} onChange={setActiveFilter} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
};

export default MemberProjectsContent;
