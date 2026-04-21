// ==================== Ant Design ====================

import { Card, Col, Row, Typography } from "antd";

// ==================== Recharts ====================

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// ==================== React ====================

import { useState, useEffect } from "react";

// ==================== API ====================

import { getProjects } from "../../Api/api/manager.api";

import managerClient from "../../Api/client/manager.client";



const { Title, Text } = Typography;



const DashboardOverview = () => {

  // Data for Project Status Chart

  const [projectStatusData, setProjectStatusData] = useState([

    { name: "Completed", value: 0, color: "#22c55e" },

    { name: "In Progress", value: 0, color: "#3b82f6" },

    { name: "Pending", value: 0, color: "#f97316" },

    { name: "Delayed", value: 0, color: "#ef4444" },

  ]);



  // Data for Task Status Chart

  const [taskStatusData, setTaskStatusData] = useState([

    { name: "To Do", value: 0, color: "#6b7280" },

    { name: "In Progress", value: 0, color: "#3b82f6" },

    { name: "Completed", value: 0, color: "#22c55e" },

  ]);



  useEffect(() => {

    fetchChartData();

  }, []);



  const fetchChartData = async () => {

    try {

      // Fetch projects

      const projectsRes = await getProjects(1, 1000);

      const projects = Array.isArray(projectsRes) ? projectsRes : [];



      // For Project Status, since projects don't have status field, count all as active for now

      // You can update this logic when backend provides project status

      setProjectStatusData([

        { name: "Active", value: projects.length, color: "#22c55e" },

        { name: "Completed", value: 0, color: "#3b82f6" },

        { name: "Pending", value: 0, color: "#f97316" },

        { name: "Delayed", value: 0, color: "#ef4444" },

      ]);



      // TODO: Add TaskStatus API when available

      setTaskStatusData([

        { name: "To Do", value: 0, color: "#6b7280" },

        { name: "In Progress", value: 0, color: "#3b82f6" },

        { name: "Completed", value: 0, color: "#22c55e" },

      ]);



    } catch (error) {

      console.error("Error fetching chart data:", error);

    }

  };



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

                  <Text style={{ fontSize: "14px" }}>{item.name}: {item.value}</Text>

                </div>

              ))}

            </div>

          </Card>

        </Col>



        {/* Task Status Pie Chart */}

        <Col xs={24} lg={12}>

          <Card

            title={<Title level={4} style={{ margin: 0 }}>Task Status</Title>}

            style={{ height: "100%" }}

          >

            <ResponsiveContainer width="100%" height={300}>

              <PieChart>

                <Pie

                  data={taskStatusData}

                  cx="50%"

                  cy="50%"

                  innerRadius={60}

                  outerRadius={100}

                  paddingAngle={5}

                  dataKey="value"

                >

                  {taskStatusData.map((entry, index) => (

                    <Cell key={`cell-${index}`} fill={entry.color} />

                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center", marginTop: "16px" }}>

              {taskStatusData.map((item, index) => (

                <div key={index} style={{ display: "flex", alignItems: "center", gap: "8px" }}>

                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: item.color }} />

                  <Text style={{ fontSize: "14px" }}>{item.name}: {item.value}</Text>

                </div>

              ))}

            </div>

          </Card>

        </Col>

      </Row>

    </div>

  );

};



export default DashboardOverview;

