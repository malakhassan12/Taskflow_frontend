import React from "react";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../../../Components/Auth/SignUp/SignUp";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignupSuccess = (result) => {
    if (result.requiresLogin) {
      if (result.isManager) {
        navigate("/", {
          state: {
            message: "Registration successful. Waiting for Admin approval.",
          },
        });
      } else {
        navigate("/login", {
          state: {
            message: "Registration successful. Please login to continue.",
          },
        });
      }
    } else {
      const userRole = result.user?.role?.toLowerCase();
      if (userRole === "manager") {
        navigate("/manager");
      } else {
        navigate("/member");
      }
    }
  };

  return <SignUpForm onSuccess={handleSignupSuccess} />;
};

export default SignUp;
