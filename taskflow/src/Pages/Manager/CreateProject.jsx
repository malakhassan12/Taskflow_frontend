import { lazy } from "react";

// ==================== Ant Design  ====================

import Typography from "antd/es/typography";
import "antd/es/typography/style";
const ProjectForm = lazy(
  () => import("../../Components/Form/Manager/ProjectForm"),
);

const CreateProject = () => {
  return (
    <div>
      <div className="pb-2">
        <Typography.Title level={3} className="font-bold">
          Create New Project
        </Typography.Title>
        <Typography.Text>
          Fill in the details below to create a new project
        </Typography.Text>
      </div>

      <div>
        <ProjectForm />
      </div>
    </div>
  );
};

export default CreateProject;
