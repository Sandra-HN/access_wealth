import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  // const { VITE_APP_AUTH_REROUTE_URL } = import.meta.env;
  const currentUrl = window.location.pathname;
  const isAuthenticated = localStorage.getItem("token") ? true : false;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
