import React from "react";
import { Navigate, RouteObject } from "react-router-dom";

export const catchallRouteToLogin: RouteObject = {
  path: "*",
  element: <Navigate to="/login" replace />,
};
