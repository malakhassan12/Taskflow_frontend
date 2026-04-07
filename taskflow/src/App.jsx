import {  Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./Routes/ProtectedRoute";
import ProjectGuard from "./Routes/ProjectGuard";

// Public Pages 
const Login = lazy(() => import("./Pages/Auth/Login/Login"));
const SignUp = lazy(() => import("./Pages/Auth/SignUp/SignUp"));
const NotFound = lazy(() => import("./Pages/NotFound"));
const Notifications = lazy(() => import("./Pages/Notifications"));
const Settings = lazy(() => import("./Pages/Settings"));
const LoadingPage =  lazy(() => import("./Pages/LoadingPage/LoadingPage"));

// Layouts
const AdminLayout = lazy(() => import("./Layouts/AdminLayout"));
const ManagerLayout = lazy(() => import("./Layouts/ManagerLayout"));
const MemberLayout = lazy(() => import("./Layouts/MemberLayout"));

// Admin Pages
const AdminDashboard = lazy(() => import("./Pages/Admin/AdminDashboard"));
const ProjectsRequests = lazy(() => import("./Pages/Admin/ProjectsRequests"));
const ManageProjects = lazy(() => import("./Pages/Admin/ManageProjects"));
const ProjectDetails = lazy(() => import("./Pages/Admin/ProjectDetails"));
const UsersManagement = lazy(() => import("./Pages/Admin/UsersManagement"));

// Manager Pages
const ManagerDashboard = lazy(() => import("./Pages/Manager/ManagerDashboard"));
const CreateProject = lazy(() => import("./Pages/Manager/CreateProject"));
const ManagerProjects = lazy(() => import("./Pages/Manager/ManagerProjects"));
const ManageProject = lazy(() => import("./Pages/Manager/ManageProject"));
const TaskDetails = lazy(() => import("./Pages/Manager/TaskDetails"));
const Teams = lazy(() => import("./Pages/Manager/Teams"));

// Member Pages
const MemberDashboard = lazy(() => import("./Pages/Member/MemberDashboard"));
const ViewRequests = lazy(() => import("./Pages/Member/ViewRequests"));
const MemberProjects = lazy(() => import("./Pages/Member/MemberProjects"));
const MemberTaskDetails = lazy(() => import("./Pages/Member/MemberTaskDetails"));
// ==================== Ant Design ====================

function App() {
  const user = {
    name: "Malak",
    role: "Admin",
  };

  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        {/* Public Routes */}
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
            <Route path="teams" element={<Teams />} />
            {/* Manage My Projects */}
            <Route path="projects" element={<ManagerProjects />}>
              {/* Create New Project */}
              <Route path="create-project" element={<CreateProject />} />

              <Route path=":projectId" element={<ProjectGuard />}>
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
    </Suspense>
  );
}

export default App;
