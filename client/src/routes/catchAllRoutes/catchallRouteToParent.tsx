import { Navigate, type RouteObject } from "react-router";

/**
 * @required The nearest parent route must have an index route or content to render
 */
export const catchallRouteToParent: RouteObject = {
  path: "*",
  element: <Navigate to=".." relative="path" replace />,
};
