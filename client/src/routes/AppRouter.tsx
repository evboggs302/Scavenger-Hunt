import React from "react";
import "../../index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Dashboard } from "@/features/dashboard/components/Dashboard";
import { catchallRouteToLogin } from "./catchAllRoutes/catchallRouteToLogin";
import { catchallRouteToParent } from "./catchAllRoutes/catchallRouteToParent";
import { AuthOutlet } from "@/features/auth/components/AuthOutlet";
import { HuntPage } from "@/features/hunts/components/HuntPage";
import { HuntDetails } from "@/features/hunts/components/HuntDetails";
import { TeamsPage } from "@/features/teams/TeamsPage";
import { CluesPage } from "@/features/clues/CluesPage";
import { ResponsesPage } from "@/features/responses/ResponsesPage";
import { SignInCard } from "@/features/auth/components/login/SignInCard";
import { SignUpCard } from "@/features/auth/components/register/SignUpCard";
import { DarkThemeProvider } from "@lib/context/DarkThemeProvider";
import { HomePage } from "@/features/home/components/HomePage";

const router = createBrowserRouter([
  {
    path: "login",
    element: <AuthOutlet />,
    children: [
      {
        index: true,
        element: <SignInCard />,
      },
      catchallRouteToParent,
    ],
  },
  {
    path: "register",
    element: <AuthOutlet />,
    children: [
      {
        index: true,
        element: <SignUpCard />,
      },
      catchallRouteToParent,
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "profile",
        element: null,
        children: [catchallRouteToParent],
      },
      {
        path: "settings",
        element: null,
        children: [catchallRouteToParent],
      },
      {
        path: "hunt/:huntId",
        element: <HuntPage />,
        children: [
          { index: true, element: <HuntDetails /> },
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

export const AppRouter = () => (
  <DarkThemeProvider>
    <RouterProvider router={router} />
  </DarkThemeProvider>
);
