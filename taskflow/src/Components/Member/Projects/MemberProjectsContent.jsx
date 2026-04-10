import React, { useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectFilter from "./ProjectFilter";
import { useTheme } from "../../../Context/DarkModeProvider";

const projects = [
  {
    id: "p1",
    name: "Website Redesign",
    description: "Complete redesign of company website with modern UI/UX",
    manager: "Sarah Johnson",
    managerInitials: "SJ",
    dueDate: "Jun 30, 2024",
    progress: 25,
    tasksDone: 1,
    tasksTotal: 4,
    teamMembers: 2,
    status: "active",
  },
  {
    id: "p2",
    name: "API Integration",
    description: "Integration with third-party payment and analytics APIs",
    manager: "Sarah Johnson",
    managerInitials: "SJ",
    dueDate: "Jul 15, 2024",
    progress: 10,
    tasksDone: 0,
    tasksTotal: 5,
    teamMembers: 1,
    status: "planning",
  },
  {
    id: "p3",
    name: "Mobile App Development",
    description: "Building a cross-platform mobile app for task tracking",
    manager: "Mike Ross",
    managerInitials: "MR",
    dueDate: "Aug 12, 2024",
    progress: 65,
    tasksDone: 8,
    tasksTotal: 12,
    teamMembers: 4,
    status: "active",
  },
  {
    id: "p4",
    name: "Database Migration",
    description: "Migrating legacy data to a high-performance MongoDB cluster",
    manager: "Harvey Specter",
    managerInitials: "HS",
    dueDate: "May 20, 2024",
    progress: 100,
    tasksDone: 10,
    tasksTotal: 10,
    teamMembers: 3,
    status: "completed",
  },
  {
    id: "p5",
    name: "E-commerce Dashboard",
    description: "Developing an admin panel for managing online sales",
    manager: "Sarah Johnson",
    managerInitials: "SJ",
    dueDate: "Sep 05, 2024",
    progress: 45,
    tasksDone: 5,
    tasksTotal: 11,
    teamMembers: 2,
    status: "active",
  },
  {
    id: "p6",
    name: "SEO Optimization",
    description: "Improving search engine ranking for the main product page",
    manager: "Rachel Zane",
    managerInitials: "RZ",
    dueDate: "Oct 10, 2024",
    progress: 5,
    tasksDone: 1,
    tasksTotal: 20,
    teamMembers: 2,
    status: "planning",
  },
  {
    id: "p7",
    name: "Security Audit",
    description: "Performing a full security assessment and fixing vulnerabilities",
    manager: "Mike Ross",
    managerInitials: "MR",
    dueDate: "Jun 15, 2024",
    progress: 80,
    tasksDone: 4,
    tasksTotal: 5,
    teamMembers: 1,
    status: "active",
  },
  {
    id: "p8",
    name: "Cloud Infrastructure Setup",
    description: "Setting up AWS services and Dockerizing the backend",
    manager: "Harvey Specter",
    managerInitials: "HS",
    dueDate: "Nov 22, 2024",
    progress: 0,
    tasksDone: 0,
    tasksTotal: 8,
    teamMembers: 3,
    status: "planning",
  },
];

const MemberProjectsContent = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const { isDarkMode } = useTheme();

  const visibleProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }
    return projects.filter(
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

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
};

export default MemberProjectsContent;
