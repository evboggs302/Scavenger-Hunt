import React from "react";
import "./index.css";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router";
import { BaseApp } from "@features/baseApp/components/BaseApp";
import { catchallRouteToLogin } from "./catchAllRoutes/catchallRouteToLogin";
import { catchallRouteToParent } from "./catchAllRoutes/catchallRouteToParent";
import { AuthOutlet } from "@features/auth/components/AuthOutlet";
import { HuntPage } from "@features/huntInfo/components/HuntPage";
import { HuntDetails } from "@features/huntInfo/components/HuntDetails";
import { TeamsPage } from "@/features/teams/components/TeamsPage";
import { CluesPage } from "@/features/clues/components/CluesPage";
import { ResponsesPage } from "@features/responses/ResponsesPage";
import { SignInCard } from "@features/auth/components/login/SignInCard";
import { SignUpCard } from "@features/auth/components/register/SignUpCard";
import { DarkThemeProvider } from "@lib/context/DarkThemeProvider";
import { HomePage } from "@features/home/components/HomePage";
import { useTokenContext } from "@lib/context/TokenContext";

const ProtectedBaseApp = () => {
  const { token } = useTokenContext();

  if (!token || token?.length === 0) {
    return <Navigate to="/" replace />;
  }

  return <BaseApp />;
};

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
    element: <ProtectedBaseApp />,
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
