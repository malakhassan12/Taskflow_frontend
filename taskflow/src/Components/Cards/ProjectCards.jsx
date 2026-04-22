// ==================== Ant Design  ====================

import { Col, Row } from "antd";
// ==================== Components  ====================

import ProjectCard from "./ProjectCard";
import { useAuth } from "../../Context/AuthContext";
import useGetProjects from "../../Hooks/Manager/useGetProjects";
import CardSkeleton from "../Skelton/CardSkelton";
import DataError from "../Error/DataError";

const ProjectCards = () => {
  const { user } = useAuth();

  const { data = [], isLoading } = useGetProjects();
  console.log(data);
  console.log(user);

  if (isLoading) {
    return <CardSkeleton />;
  }

  return (
    <div>
      {data.length > 0 ? (
        <Row gutter={[16, 16]}>
          {data?.map((project, index) => (
            <Col key={project.id} xs={24} sm={12} md={12} lg={8} xl={6}>
              <div
                data-aos="fade-down"
                data-aos-delay={index * 100}
                style={{ height: "100%" }}
              >
                <ProjectCard project={project} />
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <DataError />
      )}
    </div>
  );
};

export default ProjectCards;
