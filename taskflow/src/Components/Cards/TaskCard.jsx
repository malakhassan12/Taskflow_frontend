// ==================== Ant Design  ====================

import { Card, Avatar, Space, Tag, Typography, Grid } from "antd";
import { ClockCircleOutlined, UserOutlined } from "@ant-design/icons";
// ==================== Functions  ====================

import getStatusText from "../../Functions/Tasks/GetStatusText";
import getStatusColor from "../../Functions/Tasks/GetStatusColor";

const { Text } = Typography;
const { useBreakpoint } = Grid;
const TaskCard = ({ task }) => {
const screens = useBreakpoint();
  
  // screens.md is true if the screen is >= 768px
  // So "isMobile" would be when md is false
  const isMobile = !screens.md && screens.xs;
    // When I click on card I will take the taskmodel from Rawan

  return (
    <Card 
      hoverable
      style={{ 
        borderLeft: `3px solid ${task.status === "completed" ? "#52c41a" : task.status === "in-progress" ? "#1890ff" : "#faad14"}`,
        width: "100%",
        maxWidth: "100%",
        margin: isMobile ? "8px 0" : "0 auto",
      }}
    >
      <Space orientation={isMobile ? "vertical" : "horizontal"} size={isMobile ? "6px" : "8px"} style={{ width: "100%" }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: isMobile ? "flex-start" : "center",  
          flexWrap: "wrap",
          gap: isMobile ? "12px" : "8px",
          flexDirection: isMobile ? "column" : "row"
        }}>
          <Text strong style={{ 
            fontSize: isMobile ? "14px" : "16px",
            width: "100%"
          }}>{task.title}</Text>
          <Tag color={getStatusColor(task.status).status} style={{ 
            alignSelf: isMobile ? "flex-start" : "auto"
          }}>{getStatusText(task.status)}</Tag>
        </div>
        
        <Text type="secondary" style={{ 
          fontSize: isMobile ? "12px" : "13px",
          display: "block",
          wordBreak: "break-word"
        }}>{task.desc}</Text>
        
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: isMobile ? "flex-start" : "center", 
          marginTop: "8px",
          flexWrap: "wrap",
          gap: isMobile ? "12px" : "8px",
          flexDirection: isMobile ? "column" : "row"
        }}>
          <Space size="small" wrap>
            <Avatar size="small" style={{ backgroundColor: "#1890ff" }}>
              {task.member?.avatar}
            </Avatar>
            <Text style={{ fontSize: isMobile ? "11px" : "12px" }}>{task.member?.name}</Text>
            <Tag size="small" style={{ fontSize: isMobile ? "10px" : "11px" }}>{task.member?.role}</Tag>
          </Space>
          
          <Space size="small" wrap>
            <ClockCircleOutlined style={{ fontSize: isMobile ? "11px" : "12px", color: "#8c8c8c" }} />
            <Text type="secondary" style={{ fontSize: isMobile ? "11px" : "12px" }}>Due: {task.due_date}</Text>
          </Space>
        </div>
      </Space>
    </Card>
  );
};

export default TaskCard;