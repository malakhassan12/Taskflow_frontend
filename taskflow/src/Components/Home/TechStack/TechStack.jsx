import React from 'react';

const TechStack = () => {
  const technologies = [
    "Task Management",
    "Real-Time Updates",
    "Team Collaboration",
    "Project Tracking",
    "Workflow Automation",
    "Notifications",
    "File Sharing"
  ];

  return (
    <section className="bg-[#EEF2FF] py-12 px-6">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl p-10 shadow-sm border border-gray-50">
        {/* Title */}
        <h2 className="text-4xl font-bold text-[#4988C4] text-center mb-10">
          Smart Task Management System
        </h2>

        {/* Tech Badges Container */}
        <div className="flex flex-wrap justify-center gap-4">
          {technologies.map((tech, index) => (
            <div 
              key={index} 
              className="bg-[#EFEEFF] text-[#1E293B] px-6 py-3 rounded-xl font-medium text-sm hover:bg-[#E5E3FF] transition-colors cursor-default"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;