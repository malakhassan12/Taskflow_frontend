import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import ProtectedRoute from "./Routes/ProtectedRoute";
import ProjectGuard from "./Routes/ProjectGuard";
import AOS from "aos";
import "aos/dist/aos.css";
import Tasks from "./Pages/Task/Tasks";

// Public Pages
const Home = lazy(() => import("./Pages/Home/Home"));
const Login = lazy(() => import("./Pages/Auth/Login/Login"));
const SignUp = lazy(() => import("./Pages/Auth/SignUp/SignUp"));
const NotFound = lazy(() => import("./Pages/NotFound"));
const Notifications = lazy(() => import("./Pages/Notifications"));
const Settings = lazy(() => import("./Pages/Settings"));
const LoadingPage = lazy(() => import("./Pages/LoadingPage/LoadingPage"));

// Layouts
const AdminLayout = lazy(() => import("./Layouts/AdminLayout"));
const ManagerLayout = lazy(() => import("./Layouts/ManagerLayout"));
const MemberLayout = lazy(() => import("./Layouts/MemberLayout"));

// Admin Pages
const AdminDashboard = lazy(() => import("./Pages/Admin/AdminDashboard"));
const ProjectsRequests = lazy(() => import("./Pages/Admin/ProjectsRequests"));
const ManageProjects = lazy(() => import("./Pages/Admin/ManageProjects"));
// const ProjectDetails = lazy(() => import("./Pages/Admin/ProjectDetails"));
const UsersManagement = lazy(() => import("./Pages/Admin/UsersManagement"));
import ManagersManagement from "./Pages/Admin/ManagersManagement";

// Manager Pages
const ManagerDashboard = lazy(() => import("./Pages/Manager/ManagerDashboard"));
const CreateProject = lazy(() => import("./Pages/Manager/CreateProject"));
const ManagerProjects = lazy(() => import("./Pages/Manager/ManagerProjects"));
const ManageProject = lazy(() => import("./Pages/Manager/ManageProject"));
const TaskDetails = lazy(() => import("./Pages/Task/TaskDetails"));
const Teams = lazy(() => import("./Pages/Manager/Teams"));
import PendingProjects from "./Pages/Manager/PendingProjects";

// Member Pages
const MemberDashboard = lazy(() => import("./Pages/Member/MemberDashboard"));
const ViewRequests = lazy(() => import("./Pages/Member/ViewRequests"));
// const MemberSettings = lazy(() => import("./Pages/Member/MemberSettings"));
const MemberProjects = lazy(() => import("./Pages/Member/MemberProjects"));

// ==================== Ant Design ====================

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const user = {
    name: "Malak",
    role: "admin",
  };

  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* ==================== Admin Routes ==================== */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />

            {/* Users Management For all the system */}
            <Route path="users" element={<UsersManagement />} />

            {/* Managers Management (Accept/Reject Project Managers) */}

            <Route path="managers" element={<ManagersManagement />} />

            {/* Projects Requests  = accept or no  */}
            <Route path="project-requests" element={<ProjectsRequests />} />

            {/* Manage All Projects */}
            <Route path="projects">
              <Route index element={<ManageProjects />} />

              <Route path=":projectId">
                <Route index element={<ManageProject />} />
                <Route path="tasks">
                  <Route index element={<Tasks />} />
                  <Route path=":taskId" element={<TaskDetails />} />
                </Route>
              </Route>
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

            {/* Manage My Projects - Table View */}
            <Route path="projects">
              <Route index element={<ManagerProjects />} />
              {/* Create New Project  */}
              <Route path="create-project" element={<CreateProject />} />

              <Route path="pending-projects" element={<PendingProjects />} />

              <Route path=":projectId">
                <Route index element={<ManageProject />} />
                <Route path="tasks">
                  <Route index element={<Tasks />} />
                  <Route path=":taskId" element={<TaskDetails />} />
                </Route>
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
