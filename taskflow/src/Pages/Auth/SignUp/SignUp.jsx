import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../../../Components/Auth/SignUp/SignUp';

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignupSuccess = () => {
    navigate('/member');
  };

  return <SignUpForm onSuccess={handleSignupSuccess} />;
};

export default SignUp;
