import React from "react";
import "../index.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Dashboard } from "../src/pages/dashboard/Dashboard";
import { catchallRouteToLogin } from "./catchAllRoutes/catchallRouteToLogin";
import { catchallRouteToParent } from "./catchAllRoutes/catchallRouteToParent";
import { AuthOutlet } from "../src/pages/auth/AuthOutlet";
import { LoginPage } from "../src/pages/auth/login/LoginPage";
import { RegisterPage } from "../src/pages/auth/register/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthOutlet />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      catchallRouteToParent,
    ],
  },
  {
    path: "/register",
    element: <AuthOutlet />,
    children: [
      {
        index: true,
        element: <RegisterPage />,
      },
      catchallRouteToParent,
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      // { index: true, element: <App /> },
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
