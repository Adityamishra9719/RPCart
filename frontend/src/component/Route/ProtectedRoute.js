import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  const navigate = useNavigate();
  if (loading) return null; // You might want to return a loading spinner here.

  if (!isAuthenticated) {
    return navigate("/login");
  }

  if (isAdmin && user.role !== "admin") {
    return navigate("/login");
  }

  return <Component />;
};

export default ProtectedRoute;
