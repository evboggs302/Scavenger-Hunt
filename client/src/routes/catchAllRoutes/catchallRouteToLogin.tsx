import { Navigate, type RouteObject } from "react-router";

export const catchallRouteToLogin: RouteObject = {
  path: "*",
  element: <Navigate to="/login" replace />,
};
