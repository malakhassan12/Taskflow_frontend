import React from 'react';
// تأكدي من مسار الاستيراد الصحيح
import StatCard from './Dashboard/StatCard'; 

const MemberDashboard = () => {
  // بيانات تجريبية (Mock Data) لمحاكاة الصورة
  const statsData = [
    { title: "Total Tasks", value: "3", subtitle: "33% completion", iconName: "tasks", colorTheme: "primary" },
    { title: "Completed", value: "1", subtitle: "Tasks finished", iconName: "completed", colorTheme: "green" },
    { title: "In Progress", value: "1", subtitle: "Active work", iconName: "inprogress", colorTheme: "orange" },
    { title: "To Do", value: "1", subtitle: "Pending tasks", iconName: "todo", colorTheme: "purple" },
    { title: "Overdue", value: "2", subtitle: "Needs attention", iconName: "overdue", colorTheme: "red" },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* الجزء العلوي من الـ Dashboard */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Dashboard</h1>
        <p className="text-gray-600 mt-1.5 text-base font-normal">
          Track your assigned tasks, project progress, and performance analytics.
        </p>
      </div>

      {/* الـ Grid الـ 5 كروت */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
        {statsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* هنا سنضيف المكونات التالية في الخطوات القادمة */}
      {/* <OverdueAlert /> */}
      {/* <TaskBoard /> */}
    </div>
  );
};

export default MemberDashboard;
