import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./Routes/ProtectedRoute";

// Public Pages
import Home from "./Pages/Home/Home";
import Login from "./Pages/Auth/Login/Login";
import SignUp from "./Pages/Auth/SignUp/SignUp";
import NotFound from "./Pages/NotFound"
import Notifications from "./Pages/Notifications";
import Settings from "./Pages/Settings";

// Layouts
import AdminLayout from "./Layouts/AdminLayout";
import ManagerLayout from "./Layouts/ManagerLayout";
import MemberLayout from "./Layouts/MemberLayout";

// ==================== Admin Pages ====================
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import ProjectsRequests from "./Pages/Admin/ProjectsRequests";
import ManageProjects from "./Pages/Admin/ManageProjects";
import ProjectDetails from "./Pages/Admin/ProjectDetails";
import UsersManagement from "./Pages/Admin/UsersManagement";

// ==================== Manager Pages ====================
import ManagerDashboard from "./Pages/Manager/ManagerDashboard";
import CreateProject from "./Pages/Manager/CreateProject";
import ManagerProjects from "./Pages/Manager/ManagerProjects";
import ManageProject from "./Pages/Manager/ManageProject";
import TaskDetails from "./Pages/Manager/TaskDetails";

// ==================== Member Pages ====================
import MemberDashboard from "./Pages/Member/MemberDashboard";
import ViewRequests from "./Pages/Member/ViewRequests";
import MemberProjects from "./Pages/Member/MemberProjects";
import MemberTaskDetails from "./Pages/Member/MemberTaskDetails";

// ==================== Ant Design ====================


function App() {
  const user = {
    name: "Malak",
    role: "Admin",
  };

  return (
    <>
     

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* ==================== Admin Routes ==================== */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />

            {/* Users Management (Accept/Reject Project Managers) */}
            <Route path="users" element={<UsersManagement />} />

            {/* Projects Requests  = accept or no  */}
            <Route path="project-requests" element={<ProjectsRequests />} />

            {/* Manage All Projects */}
            <Route path="projects" element={<ManageProjects />}>
              <Route path=":projectId" element={<ProjectDetails />} />
            </Route>

            {/* Settings & Notifications */}
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* ==================== Project Manager Routes ==================== */}
        <Route element={<ProtectedRoute allowedRoles={["manager"]} />}>
          <Route path="/manager" element={<ManagerLayout />}>
            <Route index element={<ManagerDashboard />} />

            {/* Create New Project */}
            <Route path="create-project" element={<CreateProject />} />

            {/* Manage My Projects */}
            <Route path="projects" element={<ManagerProjects />}>
              <Route path=":projectId" element={<ManageProject />}>
                {/* Nested Task Details */}
                <Route path="tasks/:taskId" element={<TaskDetails />} />
              </Route>
            </Route>

            {/* Settings & Notifications */}
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* ==================== Team Member Routes ==================== */}
        <Route element={<ProtectedRoute allowedRoles={["member"]} />}>
          <Route path="/member" element={<MemberLayout />}>
            <Route index element={<MemberDashboard />} />

            {/* View Requests from Project Manager */}
            <Route path="requests" element={<ViewRequests />} />

            {/* My Projects */}
            <Route path="projects" element={<MemberProjects />}>
              <Route path=":projectId" element={<ManageProject />}>
                {/* Task Details with Update Status + Upload */}
                <Route path="tasks/:taskId" element={<MemberTaskDetails />} />
              </Route>
            </Route>

            {/* Settings & Notifications */}
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Default Redirect */}

        <Route
          path="/"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/admin" />
              ) : user.role === "manager" ? (
                <Navigate to="/manager" />
              ) : (
                <Navigate to="/member" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
