import React from 'react';
import { Layout, CheckSquare, Users, Bell, BarChart3, ShieldCheck } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      title: "Project Management",
      description: "Create and manage projects with ease. Track progress and deadlines.",
      icon: <Layout className="w-6 h-6 text-white" />,
    },
    {
      title: "Kanban Board",
      description: "Drag & drop tasks between columns. Visual workflow management.",
      icon: <CheckSquare className="w-6 h-6 text-white" />,
    },
    {
      title: "Team Collaboration",
      description: "Assign tasks, add comments, and work together seamlessly.",
      icon: <Users className="w-6 h-6 text-white" />,
    },
    {
      title: "Real-Time Notifications",
      description: "Get instant updates on task changes and team activity.",
      icon: <Bell className="w-6 h-6 text-white" />,
    },
    {
      title: "Analytics & Reports",
      description: "Track performance with detailed charts and metrics.",
      icon: <BarChart3 className="w-6 h-6 text-white" />,
    },
    {
      title: "Role-Based Access",
      description: "Secure access control for Admin, PM, and Team Members.",
      icon: <ShieldCheck className="w-6 h-6 text-white" />,
    },
  ];

  return (
    <section className="bg-[#F8F9FC] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-[#383d45] text-center mb-12">
          Powerful Features
        </h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col items-start"
            >
              {/* Icon Container */}
              <div className="bg-[#4988C4] p-3 rounded-xl mb-6">
                {feature.icon}
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-semibold text-[#1E293B] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;