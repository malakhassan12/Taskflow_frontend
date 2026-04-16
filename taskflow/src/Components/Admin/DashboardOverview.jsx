// ==================== Ant Design ====================
import { Card, Col, Row, Typography } from "antd";
// ==================== Recharts ====================
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const { Title, Text } = Typography;

const DashboardOverview = () => {
  // Data for Project Status Chart
  const projectStatusData = [
    { name: "Completed", value: 45, color: "#22c55e" },
    { name: "In Progress", value: 30, color: "#3b82f6" },
    { name: "Pending", value: 15, color: "#f97316" },
    { name: "Delayed", value: 10, color: "#ef4444" },
  ];

  // Data for Monthly Activity
  const monthlyActivityData = [
    { month: "Jan", projects: 12, tasks: 45 },
    { month: "Feb", projects: 19, tasks: 52 },
    { month: "Mar", projects: 15, tasks: 38 },
    { month: "Apr", projects: 25, tasks: 68 },
    { month: "May", projects: 22, tasks: 55 },
    { month: "Jun", projects: 30, tasks: 72 },
  ];

  

  return (
    <div style={{ marginTop: "32px" }}>
      <Row gutter={[16, 16]}>
        {/* Project Status Pie Chart */}
        <Col xs={24} lg={12}>
          <Card
            title={<Title level={4} style={{ margin: 0 }}>Project Status</Title>}
            style={{ height: "100%" }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center", marginTop: "16px" }}>
              {projectStatusData.map((item, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: item.color }} />
                  <Text style={{ fontSize: "14px" }}>{item.name}: {item.value}%</Text>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* Monthly Activity Bar Chart */}
        <Col xs={24} lg={12}>
          <Card
            title={<Title level={4} style={{ margin: 0 }}>Monthly Activity</Title>}
            style={{ height: "100%" }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyActivityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="projects" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                <Bar dataKey="tasks" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

       
      </Row>
    </div>
  );
};

export default DashboardOverview;
