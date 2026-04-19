import React, { useEffect, useState } from 'react';
import { Card, Button, message, Spin, Empty } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useTheme } from '../../Context/DarkModeProvider';

const ViewRequests = () => {
  const { isDarkMode } = useTheme();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch requests from API
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://taskflowproject1.runasp.net/api/Project', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
        message.error('Failed to load requests');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Accept request
  const handleAccept = async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://taskflowproject1.runasp.net/api/ProjectInvitations/${requestId}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success('Request accepted successfully');
      // Remove accepted request from list
      setRequests(requests.filter((req) => req.id !== requestId));
    } catch (error) {
      console.error('Error accepting request:', error);
      message.error('Failed to accept request');
    }
  };

  // Reject request
  const handleReject = async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://taskflowproject1.runasp.net/api/ProjectInvitations/${requestId}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success('Request rejected successfully');
      // Remove rejected request from list
      setRequests(requests.filter((req) => req.id !== requestId));
    } catch (error) {
      console.error('Error rejecting request:', error);
      message.error('Failed to reject request');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        Project Requests
      </h1>
      
      {requests.length === 0 ? (
        <Empty description="No pending project requests" />
      ) : (
        <div className="grid gap-4">
          {requests.map((request) => (
            <Card
              key={request.id}
              className={isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}
              title={request.projectName || 'Project Request'}
              extra={
                <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                  From: {request.senderName || 'Project Manager'}
                </span>
              }
            >
              {request.name && (
                <p className={`text-sm mb-2 ${isDarkMode ? 'text-slate-200' : 'text-gray-700'}`}>
                  <span className="font-medium">Project Name: </span>
                  {request.name}
                </p>
              )}
              {request.description && (
                <p className={`mb-4 text-sm ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                  <span className="font-medium">Description: </span>
                  {request.description}
                </p>
              )}
              <p className={`mb-4 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                {request.message || 'You have been invited to join this project.'}
              </p>
              <div className="flex gap-2">
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  onClick={() => handleAccept(request.id)}
                  className="bg-green-500 hover:bg-green-600"
                >
                  Accept
                </Button>
                <Button
                  icon={<CloseOutlined />}
                  onClick={() => handleReject(request.id)}
                  className={isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'}
                >
                  Reject
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewRequests;
