// ==================== Ant Design   ====================

import { Table } from "antd";
import { Avatar, Button, Space, Tag } from "antd";

import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

// ==================== React-router-dom  ====================

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DeleteProjectModal from "../../Modals/DeleteProjectModal";
import useGetProjects from "../../../Hooks/Manager/useGetProjects";
import { formatRegistrationDate } from "../../../Utils/TimeFormatt";

// ==================== Components  ====================

const ProjectsTable = () => {
  const navigate = useNavigate();
  const { data: temp } = useGetProjects();
  console.log(temp);
  //   {
  //   key: "1",
  //   project_id: "PRJ-001",
  //   project_name: "TaskFlow Pro",
  //   team_members: [
  //     {
  //       name: "John Brown",
  //       email: "john.brown@example.com",
  //       role: "Manager",
  //     },
  //     {
  //       name: "Sarah Wilson",
  //       email: "sarah.w@example.com",
  //       role: "Developer",
  //     },
  //     { name: "Mike Ross", email: "mike.r@example.com", role: "Designer" },
  //   ],
  //   number_of_tasks: 12,
  //   completed_tasks: 8,
  //   status: "in-progress",
  // },

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const _data = [
    {
      key: "1",
      project_id: "PRJ-001",
      project_name: "TaskFlow Pro",
      team_members: [
        {
          name: "John Brown",
          email: "john.brown@example.com",
          role: "Manager",
        },
        {
          name: "Sarah Wilson",
          email: "sarah.w@example.com",
          role: "Developer",
        },
        { name: "Mike Ross", email: "mike.r@example.com", role: "Designer" },
      ],
      number_of_tasks: 12,
      completed_tasks: 8,
      status: "in-progress",
    },
    {
      key: "2",
      project_id: "PRJ-002",
      project_name: "E-Commerce Platform",
      team_members: [
        { name: "Jim Green", email: "jim.green@example.com", role: "Manager" },
        { name: "Pam Beesly", email: "pam.b@example.com", role: "Developer" },
        {
          name: "Dwight Schrute",
          email: "dwight.s@example.com",
          role: "Tester",
        },
      ],
      number_of_tasks: 8,
      completed_tasks: 8,
      status: "completed",
    },
    {
      key: "3",
      project_id: "PRJ-003",
      project_name: "Mobile App Development",
      team_members: [
        { name: "Joe Black", email: "joe.black@example.com", role: "Manager" },
        {
          name: "Angela Martin",
          email: "angela.m@example.com",
          role: "Developer",
        },
        {
          name: "Oscar Martinez",
          email: "oscar.m@example.com",
          role: "Designer",
        },
      ],
      number_of_tasks: 15,
      completed_tasks: 5,
      status: "in-progress",
    },
    {
      key: "4",
      project_id: "PRJ-004",
      project_name: "CRM System",
      team_members: [
        {
          name: "Sarah Johnson",
          email: "sarah.j@example.com",
          role: "Manager",
        },
        {
          name: "Kevin Malone",
          email: "kevin.m@example.com",
          role: "Developer",
        },
      ],
      number_of_tasks: 10,
      completed_tasks: 3,
      status: "pending",
    },
    {
      key: "5",
      project_id: "PRJ-005",
      project_name: "AI Chatbot",
      team_members: [
        {
          name: "Michael Lee",
          email: "michael.lee@example.com",
          role: "Manager",
        },
        {
          name: "Stanley Hudson",
          email: "stanley.h@example.com",
          role: "Developer",
        },
        {
          name: "Phyllis Vance",
          email: "phyllis.v@example.com",
          role: "Tester",
        },
      ],
      number_of_tasks: 20,
      completed_tasks: 12,
      status: "in-progress",
    },
    {
      key: "6",
      project_id: "PRJ-006",
      project_name: "Dashboard Analytics",
      team_members: [
        { name: "Emily Davis", email: "emily.d@example.com", role: "Manager" },
        {
          name: "Creed Bratton",
          email: "creed.b@example.com",
          role: "Developer",
        },
      ],
      number_of_tasks: 6,
      completed_tasks: 6,
      status: "completed",
    },
    {
      key: "7",
      project_id: "PRJ-007",
      project_name: "API Gateway",
      team_members: [
        { name: "David Wilson", email: "david.w@example.com", role: "Manager" },
        {
          name: "Meredith Palmer",
          email: "meredith.p@example.com",
          role: "Developer",
        },
        {
          name: "Kelly Kapoor",
          email: "kelly.k@example.com",
          role: "Designer",
        },
      ],
      number_of_tasks: 14,
      completed_tasks: 9,
      status: "in-progress",
    },
    {
      key: "8",
      project_id: "PRJ-008",
      project_name: "Cloud Migration",
      team_members: [
        { name: "Lisa Anderson", email: "lisa.a@example.com", role: "Manager" },
        { name: "Ryan Howard", email: "ryan.h@example.com", role: "Developer" },
      ],
      number_of_tasks: 9,
      completed_tasks: 2,
      status: "pending",
    },
    {
      key: "9",
      project_id: "PRJ-009",
      project_name: "Security Audit",
      team_members: [
        {
          name: "Robert Taylor",
          email: "robert.t@example.com",
          role: "Manager",
        },
        {
          name: "Toby Flenderson",
          email: "toby.f@example.com",
          role: "Developer",
        },
        { name: "Holly Flax", email: "holly.f@example.com", role: "Tester" },
      ],
      number_of_tasks: 5,
      completed_tasks: 5,
      status: "completed",
    },
    {
      key: "10",
      project_id: "PRJ-010",
      project_name: "UI Redesign",
      team_members: [
        {
          name: "Jennifer Martin",
          email: "jennifer.m@example.com",
          role: "Manager",
        },
        {
          name: "Andy Bernard",
          email: "andy.b@example.com",
          role: "Developer",
        },
        { name: "Erin Hannon", email: "erin.h@example.com", role: "Designer" },
      ],
      number_of_tasks: 18,
      completed_tasks: 14,
      status: "in-progress",
    },
    {
      key: "11",
      project_id: "PRJ-011",
      project_name: "Database Optimization",
      team_members: [
        { name: "James White", email: "james.w@example.com", role: "Manager" },
        { name: "Gabe Lewis", email: "gabe.l@example.com", role: "Developer" },
      ],
      number_of_tasks: 7,
      completed_tasks: 4,
      status: "in-progress",
    },
    {
      key: "12",
      project_id: "PRJ-012",
      project_name: "Testing Automation",
      team_members: [
        {
          name: "Patricia Clark",
          email: "patricia.c@example.com",
          role: "Manager",
        },
        {
          name: "Robert California",
          email: "robert.c@example.com",
          role: "Developer",
        },
        {
          name: "Nellie Bertram",
          email: "nellie.b@example.com",
          role: "Tester",
        },
      ],
      number_of_tasks: 11,
      completed_tasks: 11,
      status: "completed",
    },
  ];

  const handleDeleteClick = (project) => {
    setSelectedProject(project);
    setIsDeleteModalOpen(true);
  };
  const columns = [
    {
      title: "Project ID",
      dataIndex: "id",
      key: "id",
      width: 100,
      render: (text) => <Tag color="blue">#{text}</Tag>,
    },
    {
      title: "Project Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      sorter: true,
    },
    // {
    //   title: "Team Members",
    //   dataIndex: "team_members",
    //   key: "team_members",
    //   width: 180,
    //   render: (members) => (
    //     <Avatar.Group max={{ count: 3 }} size="small">
    //       {members?.map((member, index) => (
    //         <Avatar
    //           key={index}
    //           style={{ backgroundColor: primaryColor }}
    //           title={typeof member === "string" ? member : member.name}
    //         >
    //           {typeof member === "string"
    //             ? member.charAt(0)
    //             : member.name?.charAt(0)}
    //         </Avatar>
    //       ))}
    //       {members?.length > 3 && (
    //         <Avatar style={{ backgroundColor: "#ccc" }}>
    //           +{members.length - 3}
    //         </Avatar>
    //       )}
    //     </Avatar.Group>
    //   ),
    // },

    // {
    //   title: "Tasks",
    //   dataIndex: "number_of_tasks",
    //   key: "number_of_tasks",
    //   width: 80,
    //   align: "center",
    // },

    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      width: 80,
      sorter: true,
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      width: 80,
      sorter: true,
    },

    {
      title: "Actions",
      key: "action",
      width: 150,
      fixed: window.innerWidth >= 768 ? "right" : false,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => navigate(`/manager/projects/${record.id}`)}
          >
            View details
          </Button>

          <Button
            type="link"
            icon={<DeleteOutlined />}
            size="small"
            danger
            onClick={() => handleDeleteClick(record)}
          />
        </Space>
      ),
    },
  ];

  const moko = temp?.map((item) => ({
    ...item,
    endDate: formatRegistrationDate(item.endDate),
    startDate: formatRegistrationDate(item.startDate),
  }));
  return (
    <div>
      {isDeleteModalOpen && (
        <DeleteProjectModal
          open={isDeleteModalOpen}
          setOpen={setIsDeleteModalOpen}
          project={selectedProject}
        />
      )}
      <div data-aos="zoom-in">
        <Table
          columns={columns}
          dataSource={moko || []}
          scroll={{ x: 1000 }}
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Total ${total} items`,
          }}
        />
      </div>
    </div>
  );
};

export default ProjectsTable;
