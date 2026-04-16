import React, { createContext, useContext, useState, useEffect } from "react";
import { message } from "antd";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  // Frontend validation for signup
  const validateSignup = (formData) => {
    const errors = {};
    
    // First Name validation
    if (!formData.firstName || formData.firstName.trim().length < 2) {
      errors.firstName = "First name must be at least 2 characters";
    } else if (formData.firstName.trim().length > 50) {
      errors.firstName = "First name must be less than 50 characters";
    }

    // Last Name validation
    if (!formData.lastName || formData.lastName.trim().length < 2) {
      errors.lastName = "Last name must be at least 2 characters";
    } else if (formData.lastName.trim().length > 50) {
      errors.lastName = "Last name must be less than 50 characters";
    }

    // Age validation
    if (!formData.age || formData.age < 18) {
      errors.age = "You must be at least 18 years old";
    } else if (formData.age > 120) {
      errors.age = "Please enter a valid age";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Password validation (minimum 6 characters as per design)
    if (!formData.password || formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    } else if (formData.password.length > 128) {
      errors.password = "Password must be less than 128 characters";
    }

    // Confirm password validation
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  // Frontend validation for login
  const validateLogin = (formData) => {
    const errors = {};
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password || formData.password.length < 1) {
      errors.password = "Password is required";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  // Signup function
  const signup = async (formData) => {
    setLoading(true);
    
    try {
      // Frontend validation
      const validation = validateSignup(formData);
      if (!validation.isValid) {
        Object.values(validation.errors).forEach((error) => {
          message.error(error);
        });
        setLoading(false);
        return { success: false, errors: validation.errors };
      }

      // Prepare data for backend
      const signupData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        age: parseInt(formData.age),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };

      
      const mockUser = {
        id: "1",
        firstName: signupData.firstName,
        lastName: signupData.lastName,
        age: signupData.age,
        email: signupData.email,
        userName: signupData.email.split('@')[0],
        role: "member",
      };
      
      const mockToken = "mock-jwt-token";
      
      setUser(mockUser);
      setToken(mockToken);
      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("token", mockToken);
      
      message.success("Account created successfully!");
      setLoading(false);
      return { success: true, user: mockUser };
      
    } catch (error) {
      message.error(error.message || "Signup failed");
      setLoading(false);
      return { success: false, error: error.message };
    }
  };

  // Login function
  const login = async (formData) => {
    setLoading(true);
    
    try {
      // Frontend validation
      const validation = validateLogin(formData);
      if (!validation.isValid) {
        Object.values(validation.errors).forEach((error) => {
          message.error(error);
        });
        setLoading(false);
        return { success: false, errors: validation.errors };
      }

      // Prepare data for backend
      const loginData = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };

      const mockUser = {
        id: "1",
        fullName: "Admin User",
        email: loginData.email,
        userName: loginData.email.split('@')[0],
        role: "admin",
      };
      
      const mockToken = "mock-jwt-token";
      
      setUser(mockUser);
      setToken(mockToken);
      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("token", mockToken);
      
      message.success("Login successful!");
      setLoading(false);
      return { success: true, user: mockUser };
      
    } catch (error) {
      message.error(error.message || "Login failed");
      setLoading(false);
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    message.success("Logged out successfully");
  };

  const value = {
    user,
    token,
    loading,
    signup,
    login,
    logout,
    validateSignup,
    validateLogin,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
