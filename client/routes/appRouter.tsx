import React from "react";
import "../index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Dashboard } from "../src/pages/dashboard/Dashboard";
import { catchallRouteToLogin } from "./catchAllRoutes/catchallRouteToLogin";
import { catchallRouteToParent } from "./catchAllRoutes/catchallRouteToParent";
import { AuthOutlet } from "../src/pages/auth/AuthOutlet";
import { LoginPage } from "../src/pages/auth/login/LoginPage";
import { RegisterPage } from "../src/pages/auth/register/RegisterPage";
import { HuntInfo } from "../src/pages/hunts/HuntInfo";
import { HuntDetailsPage } from "../src/pages/hunts/HuntDetailsPage";
import { TeamsPage } from "../src/pages/teams/TeamsPage";
import { CluesPage } from "../src/pages/clues/CluesPage";
import { ResponsesPage } from "../src/pages/responses/ResponsesPage";

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
      {
        path: "hunt/:id",
        element: <HuntInfo />,
        children: [
          { index: true, element: <HuntDetailsPage /> },
          {
            path: "teams",
            element: <TeamsPage />,
          },
          {
            path: "clues",
            element: <CluesPage />,
          },
          {
            path: "responses",
            element: <ResponsesPage />,
          },
          catchallRouteToParent,
        ],
      },
      catchallRouteToParent,
    ],
  },
  catchallRouteToLogin,
]);

export const AppRouter = () => <RouterProvider router={router} />;
