import React from "react";
import { Navigate } from "react-router-dom";

const getStoredUser = () => {
  try {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      return JSON.parse(currentUser);
    }

    const legacyUser = localStorage.getItem("user");
    if (legacyUser) {
      return JSON.parse(legacyUser);
    }
  } catch (error) {
    console.error("Failed to parse stored user", error);
  }

  return null;
};

const AdminRoute = ({ children }) => {
  const user = getStoredUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;