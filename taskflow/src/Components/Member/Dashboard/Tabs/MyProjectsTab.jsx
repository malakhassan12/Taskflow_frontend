import React, { useMemo } from "react";
import ProjectCard from "../../Projects/ProjectCard";
import { MEMBER_PROJECTS_DEMO } from "../../../../Data/memberProjectsDemo";

const MyProjectsTab = () => {
  const activeProjects = useMemo(
    () =>
      MEMBER_PROJECTS_DEMO.filter(
        (p) => String(p.status || "").toLowerCase() === "active",
      ),
    [],
  );

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {activeProjects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
};

export default MyProjectsTab;
