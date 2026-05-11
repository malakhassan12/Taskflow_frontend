import React, { createContext, useContext, useState } from "react";

import { message } from "antd";

import axios from "axios";

import { jwtDecode } from "jwt-decode";



const AuthContext = createContext(null);



export const AuthProvider = ({ children }) => {

  const [loading, setLoading] = useState(false);



  // ...existing code...



  // Lazy initializer for user state

  const initializeUser = () => {

    try {

      if (typeof window === "undefined") return null;

      const storedToken = localStorage.getItem("token");



      if (storedToken) {

        const decodedToken = jwtDecode(storedToken);

        const userFromToken = {

          email: decodedToken.email || decodedToken.Email || "",

          userId:

            decodedToken.sub ||

            decodedToken[

              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"

            ] ||

            "",

          role:

            decodedToken.role ||

            decodedToken.Role ||

            decodedToken[

              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"

            ] ||

            "member",

          name:

            decodedToken.name ||

            decodedToken.Name ||

            decodedToken[

              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"

            ] ||

            "",

          token: storedToken,

        };

        return userFromToken;

      }

    } catch {

      // If token is invalid, clear it

      if (typeof window !== "undefined") {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

      }

    }

    return null;

  };



  // Lazy initializer for token state

  const initializeToken = () => {

    try {

      if (typeof window === "undefined") return null;

      const storedToken = localStorage.getItem("token");

      return storedToken;

    } catch {

      return null;

    }

  };



  const [user, setUser] = useState(initializeUser);

  const [token, setToken] = useState(initializeToken);



  // Remove the useEffect that was setting state on mount, as it's now handled by lazy initialization

  // If useEffect had other logic, keep it but remove the state-setting lines



  // ...existing code...



  // Load user from localStorage on mount

  // useEffect(() => {

  //   console.log(token)



  //   const storedToken = localStorage.getItem("token");



  //   if (storedToken) {

  //     try {

  //       // Decode token to get user data

  //       const decodedToken = jwtDecode(storedToken);

  //       const userFromToken = {

  //         email: decodedToken.email || decodedToken.Email || "",

  //         role: decodedToken.role || decodedToken.Role || decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "member",

  //         name: decodedToken.name || decodedToken.Name || decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || "",

  //         token: storedToken,

  //       };

  //       setUser(userFromToken);

  //       setToken(storedToken);

  //       localStorage.setItem("user", JSON.stringify(userFromToken));

  //     } catch (error) {

  //       console.error("Error decoding token:", error);

  //       // If token is invalid, clear localStorage

  //       localStorage.removeItem("token");

  //       localStorage.removeItem("user");

  //       localStorage.removeItem("tokenExpiration");

  //     }

  //   }

  // }, []);



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

    if (

      formData.confirmPassword &&

      formData.password !== formData.confirmPassword

    ) {

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

        role: formData.role === "manager" ? "ProjectManager" : "TeamMember",

        password: formData.password,

        phone: `${formData.countryCode}${formData.phoneNumber}`,

      };



      // Real API call

      await axios.post(

        "http://taskflowproject1.runasp.net/api/Account/register",

        signupData,

      );



      // Backend returns only success message, not token

      // User needs to login after signup

      if (signupData.role === "ProjectManager") {

        setLoading(false);

        return { success: true, requiresLogin: true, isManager: true };

      } else {

        message.success("Account created successfully! Please login.");

        setLoading(false);

        return { success: true, requiresLogin: true, isManager: false };

      }

    } catch (error) {

      console.log("Signup error:", error);

      let errorMsg = "Signup failed";



      if (

        error.code === "ERR_NETWORK" ||

        error.message.includes("Network Error")

      ) {

        errorMsg = "Network error. Please check your connection and try again.";

      } else if (error.response?.status === 500) {

        errorMsg = "Server error. Please try again later.";

      } else if (error.response?.status === 400) {

        errorMsg =

          error.response?.data?.message ||

          error.response?.data ||

          "Invalid data provided";

      } else if (error.response?.data?.message) {

        errorMsg = error.response.data.message;

      } else if (error.response?.data) {

        errorMsg =

          typeof error.response.data === "string"

            ? error.response.data

            : "Signup failed";

      }



      message.error(errorMsg);

      setLoading(false);

      return { success: false, error: errorMsg };

    }

  };



  // Login function

  const login = async (formData) => {

    setLoading(true);



    try {

      // Frontend validation

      if (!formData.email || !formData.email.trim()) {

        message.error("Email is required");

        setLoading(false);

        return { success: false, error: "Email is required" };

      }



      if (!formData.password) {

        message.error("Password is required");

        setLoading(false);

        return { success: false, error: "Password is required" };

      }



      // Real API call

      console.log("Login request data:", { email: formData.email, password: formData.password });

      const response = await axios.post(

        "http://taskflowproject1.runasp.net/api/Account/login",

        {

          email: formData.email,

          password: formData.password,

        },

      );



      const { data } = response;



      // Backend returns: { token: string, expiration: date }

      // Decode JWT token to extract user data

      const decodedToken = jwtDecode(data.token);



      // Store token in localStorage

      setToken(data.token);

      localStorage.setItem("token", data.token);



      // Store expiration if provided

      if (data.expiration) {

        localStorage.setItem("tokenExpiration", data.expiration);

      }



      // Create user object from decoded token

      const userFromToken = {

        email: decodedToken.email || decodedToken.Email || formData.email,

        userId:

          decodedToken.sub ||

          decodedToken[

            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"

          ] ||

          "",

        role:

          decodedToken.role ||

          decodedToken.Role ||

          decodedToken[

            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"

          ] ||

          "member",

        name:

          decodedToken.name ||

          decodedToken.Name ||

          decodedToken[

            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"

          ] ||

          "",

        token: data.token,

      };

      setUser(userFromToken);

      localStorage.setItem("user", JSON.stringify(userFromToken));



      message.success("Login successful!");

      setLoading(false);

      return { success: true, user: userFromToken };

    } catch (error) {

      console.error("Login error details:", error);

      console.error("Error response:", error.response?.data);

      console.error("Error status:", error.response?.status);

      const errorMsg =

        error.response?.data?.message || error.response?.data || "Login failed";

      message.error(errorMsg);

      setLoading(false);

      return { success: false, error: errorMsg };

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

