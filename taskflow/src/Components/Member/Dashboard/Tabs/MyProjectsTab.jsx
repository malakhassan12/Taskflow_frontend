import React from "react";
import ProjectCard from "../../Projects/ProjectCard";

const projects = [
  {
    id: "p1",
    name: "Website Redesign",
    manager: "Sarah Ali",
    dueDate: "May 10",
    progress: 72,
    tasks: 8,
  },
  {
    id: "p2",
    name: "Mobile App QA",
    manager: "Ahmed Samy",
    dueDate: "Apr 28",
    progress: 48,
    tasks: 5,
  },
  {
    id: "p3",
    name: "Internal Dashboard",
    manager: "Nour Emad",
    dueDate: "Apr 18",
    progress: 100,
    tasks: 10,
  },
];

const MyProjectsTab = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
};

export default MyProjectsTab;
