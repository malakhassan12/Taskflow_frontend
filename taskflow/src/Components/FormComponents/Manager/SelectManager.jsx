import { Form, Select, Space, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { primaryColor } from "../../../Constants/Colors";
import useGetAllMembers from "../../../Hooks/Manager/useGetAllMembers";

const SelectManager = () => {
  const { data: members, isLoading } = useGetAllMembers();

  const memberOptions = members?.map((member) => ({
    label: member.email || member.name || "Team Member",
    value: member.id,
    email: member.email,
    name: member.name,
  })) || [];

  return (
    <Form.Item
      name="assignedMemberId"
      label={
        <span>
          <UserOutlined style={{ marginRight: "8px", color: primaryColor }} />
          Assign Member
        </span>
      }
      rules={[{ required: true, message: "Please select a team member!" }]}
    >
      <Select
        style={{ width: "100%" }}
        placeholder="Select a team member"
        loading={isLoading}
        showSearch
        optionFilterProp="label"
        options={memberOptions}
        optionRender={(option) => (
          <Space>
            <Avatar size="small" icon={<UserOutlined />} />
            <span>{option.data.label}</span>
          </Space>
        )}
      />
   

    </Form.Item>
  );
};

export default SelectManager;