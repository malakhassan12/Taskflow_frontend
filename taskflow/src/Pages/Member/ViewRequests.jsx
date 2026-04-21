import React, { useEffect, useState } from 'react';
import { Card, Button, message, Spin, Empty } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useTheme } from '../../Context/DarkModeProvider';
import { jwtDecode } from 'jwt-decode';

const ViewRequests = () => {
  const { isDarkMode } = useTheme();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [respondingId, setRespondingId] = useState(null);

  const getCurrentUserId = () => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser.userId) {
      return storedUser.userId;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      return '';
    }

    try {
      const decoded = jwtDecode(token);
      return (
        decoded.sub ||
        decoded.userId ||
        decoded.UserId ||
        decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] ||
        ''
      );
    } catch {
      return '';
    }
  };

  // Fetch requests from API
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = getCurrentUserId();

        if (!userId) {
          message.error('User ID not found. Please login again.');
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://taskflowproject1.runasp.net/api/Task/pending/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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

  const sendTaskResponse = async ({ taskId, isAccepted, userId }) => {
    const token = localStorage.getItem('token');
    const currentUserId = getCurrentUserId();

    // Use the correct userId for the endpoint
    const effectiveUserId = userId || currentUserId;

    if (!effectiveUserId) {
      throw new Error('Could not detect current user id. Please login again.');
    }

    const endpoint = isAccepted
      ? `http://taskflowproject1.runasp.net/api/Task/Accept`
      : `http://taskflowproject1.runasp.net/api/Task/Reject`;

    try {
      await axios({
        method: 'post',
        url: endpoint,
        params: {
          taskId: Number(taskId),
          userId: String(effectiveUserId),
        },
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: '*/*',
        },
      });
    } catch (error) {
      throw error;
    }
  };

  // Accept request
  const handleAccept = async (request) => {
    const requestId = request.id;
    if (respondingId != null) {
      return;
    }
    try {
      setRespondingId(requestId);
      await sendTaskResponse({
        taskId: requestId,
        isAccepted: true,
        userId: request.assignedMemberId,
      });
      message.success('Request accepted successfully');
      // Remove accepted request from list
      setRequests((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.error('Error accepting request:', error);
      const detail =
        error.response?.data?.message ||
        error.response?.data?.title ||
        (error.response?.data?.errors
          ? JSON.stringify(error.response.data.errors)
          : '') ||
        (typeof error.response?.data === 'string' ? error.response.data : '');
      message.error(detail || 'Failed to accept request (400)');
    } finally {
      setRespondingId(null);
    }
  };

  // Reject request
  const handleReject = async (request) => {
    const requestId = request.id;
    if (respondingId != null) {
      return;
    }
    try {
      setRespondingId(requestId);
      await sendTaskResponse({
        taskId: requestId,
        isAccepted: false,
        userId: request.assignedMemberId,  // Backend checks AssignedMemberId == userId
      });
      message.success('Request rejected successfully');
      // Remove rejected request from list
      setRequests((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.error('Error rejecting request:', error);
      const detail =
        error.response?.data?.message ||
        error.response?.data?.title ||
        (error.response?.data?.errors
          ? JSON.stringify(error.response.data.errors)
          : '') ||
        (typeof error.response?.data === 'string' ? error.response.data : '');
      message.error(detail || 'Failed to reject request (400)');
    } finally {
      setRespondingId(null);
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
        Task Requests
      </h1>
      
      {requests.length === 0 ? (
        <Empty description="No pending task requests" />
      ) : (
        <div className="grid gap-4">
          {requests.map((request) => (
            <Card
              key={request.id}
              className={isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}
              title={request.title || request.name || 'Task Request'}
              extra={
                <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                  From: {request.assignedMemberName || request.senderName || 'Manager'}
                </span>
              }
            >
              {request.priority !== undefined && (
                <p className={`text-sm mb-2 ${isDarkMode ? 'text-slate-200' : 'text-gray-700'}`}>
                  <span className="font-medium">Priority: </span>
                  <span className={
                    request.priority === 3 ? 'text-red-500' : 
                    request.priority === 2 ? 'text-yellow-500' : 'text-green-500'
                  }>
                    {request.priority === 3 ? 'High' : request.priority === 2 ? 'Medium' : 'Low'}
                  </span>
                </p>
              )}
              {request.discription && (
                <p className={`mb-4 text-sm ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                  <span className="font-medium">Description: </span>
                  {request.discription}
                </p>
              )}
              {request.description && (
                <p className={`mb-4 text-sm ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                  <span className="font-medium">Description: </span>
                  {request.description}
                </p>
              )}
              <div className="flex gap-2">
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  onClick={() => handleAccept(request)}
                  loading={respondingId === request.id}
                  disabled={respondingId != null}
                  className="bg-green-500 hover:bg-green-600"
                >
                  Accept
                </Button>
                <Button
                  icon={<CloseOutlined />}
                  onClick={() => handleReject(request)}
                  loading={respondingId === request.id}
                  disabled={respondingId != null}
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
