import React from 'react';
import DashboardMonitor from '../../Components/Admin/DashboardMonitor';
import DashboardOverview from '../../Components/Admin/DashboardOverview';
import DashboardCards from '../../Components/Admin/DashboardCards';
import DashboardStatus from '../../Components/Admin/DashboardStatus';

const AdminDashboard = () => {
  return (
    <div style={{ padding: '24px' }}>
      <DashboardMonitor />
      <DashboardCards />
      <DashboardOverview />
      <DashboardStatus />
    </div>
  )
}

export default AdminDashboard
