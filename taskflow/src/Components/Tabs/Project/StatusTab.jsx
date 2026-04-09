// ==================== Ant Design  ====================

import { Col, Row } from "antd";
// ==================== Constants  ====================

import { taskStatus } from "../../../Constants/TaskConstants";
// ==================== Components  ====================

import TasksCard from "../../Cards/TasksCard";

const StatusTab = () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        {taskStatus.map((item, i) => (
          <Col  xs={24} xl={12} key={i}>
            <TasksCard status={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default StatusTab;
