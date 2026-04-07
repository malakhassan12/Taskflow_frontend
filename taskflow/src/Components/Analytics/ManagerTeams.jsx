// ==================== Ant Design  ====================
import { Typography, Card } from "antd";
// ==================== recharts  ====================

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  CartesianGrid 
} from 'recharts';
// ==================== Constants  ====================

import { purple } from '../../Constants/Colors';

const { Title, Text } = Typography;

const statusDistribution = [
  { status: 'Completed', teamCount: 8, color: purple },
  { status: 'In Progress', teamCount: 15, color: '#818cf8' },
  { status: 'To Do', teamCount: 5, color: '#e0e7ff' },
];

const ManagerTeams = () => {
  return (
    <Card style={{ borderRadius: '16px', border: '1px solid #f0f0f0' }}>
      <header style={{ marginBottom: '24px' }}>
        <Title level={3} style={{ marginBottom: '4px' }}>System Team Status</Title>
        <Text type="secondary">
          Total count of teams grouped by current progression state
        </Text>
      </header>

      <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={statusDistribution}
            margin={{ top: 20, right: 30, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="status" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#595959', fontSize: 13, fontWeight: 500 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              allowDecimals={false} 
              tick={{ fill: '#8c8c8c' }}
            /> 
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ 
                borderRadius: '8px', 
                border: 'none', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
              }}
              formatter={(value) => [`${value} Teams`, 'Count']}
            />
            
            <Bar 
              dataKey="teamCount" 
              radius={[6, 6, 0, 0]} 
              barSize={60}
            >
              {statusDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div style={{ marginTop: '16px', textAlign: 'center' }}>
        <Text strong style={{ color: purple, fontSize: '16px' }}>
          Total Teams in System: {statusDistribution.reduce((a, b) => a + b.teamCount, 0)}
        </Text>
      </div>
    </Card>
  );
};

export default ManagerTeams;