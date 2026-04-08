import { Table, Card, Input, Typography } from "antd";
import { columns } from "../../Constants/ManagerConstants";

const { Title } = Typography;
const { Search } = Input;

const TeamTable = () => {
  // From API
  const data = [
    {
      key: "1",
      project_id: "PRJ-001",
      project_name: "TaskFlow Pro",
      name: "John Brown",
      email: "john.brown@example.com",
      phone: "+1 234-567-8900",
      number_of_tasks: 12,
      completed_tasks: 8,
      tags: ["nice", "developer"],
      status: "in-progress",
    },
    {
      key: "2",
      project_id: "PRJ-002",
      project_name: "E-Commerce Platform",
      name: "Jim Green",
      email: "jim.green@example.com",
      phone: "+1 234-567-8901",
      number_of_tasks: 8,
      completed_tasks: 8,
      tags: ["kawaii"],
      status: "completed",
    },
    {
      key: "3",
      project_id: "PRJ-003",
      project_name: "Mobile App Development",
      name: "Joe Black",
      email: "joe.black@example.com",
      phone: "+1 234-567-8902",
      number_of_tasks: 15,
      completed_tasks: 5,
      tags: ["cool", "teacher"],
      status: "in-progress",
    },
    {
      key: "4",
      project_id: "PRJ-004",
      project_name: "CRM System",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+1 234-567-8903",
      number_of_tasks: 10,
      completed_tasks: 3,
      tags: ["urgent", "priority"],
      status: "pending",
    },
    {
      key: "5",
      project_id: "PRJ-005",
      project_name: "AI Chatbot",
      name: "Michael Lee",
      email: "michael.lee@example.com",
      phone: "+1 234-567-8904",
      number_of_tasks: 20,
      completed_tasks: 12,
      tags: ["ai", "machine-learning"],
      status: "in-progress",
    },
    {
      key: "6",
      project_id: "PRJ-006",
      project_name: "Dashboard Analytics",
      name: "Emily Davis",
      email: "emily.d@example.com",
      phone: "+1 234-567-8905",
      number_of_tasks: 6,
      completed_tasks: 6,
      tags: ["analytics", "dashboard"],
      status: "completed",
    },
    {
      key: "7",
      project_id: "PRJ-007",
      project_name: "API Gateway",
      name: "David Wilson",
      email: "david.w@example.com",
      phone: "+1 234-567-8906",
      number_of_tasks: 14,
      completed_tasks: 9,
      tags: ["backend", "api"],
      status: "in-progress",
    },
    {
      key: "8",
      project_id: "PRJ-008",
      project_name: "Cloud Migration",
      name: "Lisa Anderson",
      email: "lisa.a@example.com",
      phone: "+1 234-567-8907",
      number_of_tasks: 9,
      completed_tasks: 2,
      tags: ["cloud", "devops"],
      status: "pending",
    },
    {
      key: "9",
      project_id: "PRJ-009",
      project_name: "Security Audit",
      name: "Robert Taylor",
      email: "robert.t@example.com",
      phone: "+1 234-567-8908",
      number_of_tasks: 5,
      completed_tasks: 5,
      tags: ["security", "audit"],
      status: "completed",
    },
    {
      key: "10",
      project_id: "PRJ-010",
      project_name: "UI Redesign",
      name: "Jennifer Martin",
      email: "jennifer.m@example.com",
      phone: "+1 234-567-8909",
      number_of_tasks: 18,
      completed_tasks: 14,
      tags: ["design", "ui-ux"],
      status: "in-progress",
    },
    {
      key: "11",
      project_id: "PRJ-011",
      project_name: "Database Optimization",
      name: "James White",
      email: "james.w@example.com",
      phone: "+1 234-567-8910",
      number_of_tasks: 7,
      completed_tasks: 4,
      tags: ["database", "performance"],
      status: "in-progress",
    },
    {
      key: "12",
      project_id: "PRJ-012",
      project_name: "Testing Automation",
      name: "Patricia Clark",
      email: "patricia.c@example.com",
      phone: "+1 234-567-8911",
      number_of_tasks: 11,
      completed_tasks: 11,
      tags: ["testing", "automation"],
      status: "completed",
    },
  ];

  // In View =  Will appear all tasks for this member can add , delete , edit task ,  show the status of the task , appproved or reject task , dowload the complete task and filally , Show the performace in this peoject for member

  return (
    <div >
      <Card style={{ borderRadius: "12px" }}>
        <div
          style={{
            marginBottom: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap :"wrap",
            gap:"1rem"
            
          }}
        >
          <Title level={4} style={{ margin: 0 }}>
            Team Projects
          </Title>
          <Search placeholder="Search..." style={{ width: 250 }} />
        </div>

        <Table
          columns={columns}
          dataSource={data}
          scroll={{ x: 1000 }}
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Total ${total} items`,
          }}
        />
      </Card>
    </div>
  );
};

export default TeamTable;
