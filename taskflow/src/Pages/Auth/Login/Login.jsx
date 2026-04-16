import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../../Components/Auth/Login/Login';

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/admin');
  };

  return <LoginForm onSuccess={handleLoginSuccess} />;
};

export default Login
