import React from "react";
import { Users2 } from "lucide-react";
import { Link } from "react-router-dom";

const Accounts = () => {
  const accounts = [
    {
      role: "Administrator",
      description:
        "Manage users, approve project managers, and oversee the entire system",
      iconBg: "bg-[#CE2626]",
      buttonLabel: "Try as Administrator",
    },
    {
      role: "Project Manager",
      description:
        "Create projects, assign tasks, and monitor team performance in real-time",
      iconBg: "bg-[#4988C4]",
      buttonLabel: "Try as Project Manager",
    },
    {
      role: "Team Member",
      description:
        "Work on assigned tasks, update progress, and collaborate with your team",
      iconBg: "bg-[#63A361]",
      buttonLabel: "Try as Team Member",
    },
  ];

  return (
    <section className="bg-[#EEF2FF] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1E293B] mb-4">
            Explore Roles in TaskNova
          </h2>
          <p className="text-gray-500 text-lg">
            Each role has unique responsibilities in managing tasks and
            workflow. Try them to explore the full system.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accounts.map((account, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-sm flex flex-col border border-transparent hover:border-indigo-100 transition-all duration-300 text-center"
            >
              {/* Icon Container */}
              <div className="w-full flex justify-center">
                <div
                  className={`${account.iconBg} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm `}
                >
                  <Users2 className="text-white w-7 h-7" />
                </div>
              </div>

              {/* Info Section */}
              <h3 className="text-xl font-bold text-[#1E293B] mb-2">
                {account.role}
              </h3>
              <p className="text-gray-400 text-sm mb-8 min-h-[40px]">
                {account.description}
              </p>

              {/* Action Button */}

              <Link
                to="/login"
                className="mt-auto w-full bg-[#4988C4] hover:bg-[#6c8bef] text-white py-4 rounded-2xl font-semibold text-sm transition-colors shadow-lg shadow-indigo-100"
              >
                {account.buttonLabel}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accounts;
