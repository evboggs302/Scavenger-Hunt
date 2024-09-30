import React from "react";
import { Navigate, RouteObject } from "react-router-dom";

/**
 * @required The nearest parent route must have an index route or content to render
 */
export const catchallRouteToParent: RouteObject = {
  path: "*",
  element: <Navigate to="." relative="path" replace />,
};
