import { Navigate, Outlet, useParams } from "react-router-dom";

const ProjectGuard = () => {
  const { projectId } = useParams();

  return projectId ? <Outlet /> : <Navigate to="/manager/projects" />;
};

export default ProjectGuard;