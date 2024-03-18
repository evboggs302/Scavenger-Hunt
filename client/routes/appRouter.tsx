import React from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Dashboard } from "../src/pages/dashboard/Dashboard";
import LogIn from "../src/pages/login/LoginPage";
import { catchallRouteToLogin } from "./catchAllRoutes/catchallRouteToLogin";
import { catchallRouteToParent } from "./catchAllRoutes/catchallRouteToParent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LogIn />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { index: true, element: <App /> },
      // {
      //   path: "hunt",
      //   element: <Outlet />,
      //   children: [
      //     { index: true, element: <Hunt /> },
      //     {
      //       path: "teams",
      //       element: <Team />,
      //     },
      //     {
      //       path: "clues",
      //       element: <Team />,
      //     },
      //     {
      //       path: "responses",
      //       element: <Team />,
      //     },
      //   ],
      // },
      catchallRouteToParent,
    ],
  },
  catchallRouteToLogin,
]);

export const AppRouter = () => <RouterProvider router={router} />;
