import React from "react";
import "../../index.css";
import CssBaseline from "@mui/material/CssBaseline";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Dashboard } from "@pages/dashboard/Dashboard";
import { catchallRouteToLogin } from "./catchAllRoutes/catchallRouteToLogin";
import { catchallRouteToParent } from "./catchAllRoutes/catchallRouteToParent";
import { AuthOutlet } from "@pages/auth/AuthOutlet";
import { HuntInfo } from "@pages/hunts/HuntInfo";
import { HuntDetailsPage } from "@pages/hunts/HuntDetailsPage";
import { TeamsPage } from "@pages/teams/TeamsPage";
import { CluesPage } from "@pages/clues/CluesPage";
import { ResponsesPage } from "@pages/responses/ResponsesPage";
import { SignInCard } from "@pages/auth/login/SignInCard";
import { SignUpCard } from "@pages/auth/register/SignUpCard";

const router = createBrowserRouter([
  {
    path: "/login",
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
    path: "/register",
    element: <AuthOutlet />,
    children: [
      {
        index: true,
        element: <SignUpCard />,
      },
      catchallRouteToParent,
    ],
  },
  // {
  //   path: "/dashboard",
  //   element: <Dashboard />,
  //   children: [
  //     {
  //       path: "hunt/:id",
  //       element: <HuntInfo />,
  //       children: [
  //         { index: true, element: <HuntDetailsPage /> },
  //         {
  //           path: "teams",
  //           // element: <TeamsPage />,
  //         },
  //         {
  //           path: "clues",
  //           element: <CluesPage />,
  //         },
  //         {
  //           path: "responses",
  //           element: <ResponsesPage />,
  //         },
  //         catchallRouteToParent,
  //       ],
  //     },
  //     catchallRouteToParent,
  //   ],
  // },
  catchallRouteToLogin,
]);

export const AppRouter = () => (
  <>
    <CssBaseline />
    <RouterProvider router={router} />
  </>
);
export default router;
