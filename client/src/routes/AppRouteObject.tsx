import { Navigate } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import { useTokenContext } from "@lib/context/TokenContext";
import { ErrorFallback } from "@lib/components/ErrorFallback/ErrorFallback";
import { BaseApp } from "@features/baseApp/components/BaseApp";
import { HomePage } from "@features/home/components/HomePage";
import { catchallRouteToParent } from "./catchAllRoutes/catchallRouteToParent";
import { HuntDashboardRouteObject } from "./HuntDashboardRouteObject";
import Box from "@mui/material/Box";

const ProtectedBaseApp = () => {
  const { token } = useTokenContext();

  if (!token || token?.length === 0) {
    localStorage.removeItem("BEARER_TOKEN");
    return <Navigate to="/" replace />;
  }

  return (
    <ErrorBoundary
      fallbackRender={(fallbackProps) => (
        <ErrorFallback
          {...fallbackProps}
          message="There was a problem rendering the child app."
        />
      )}
    >
      <BaseApp />
    </ErrorBoundary>
  );
};

export const AppRouteObject = {
  path: "app",
  element: <ProtectedBaseApp />,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: "account",
      element: <Box>Account</Box>,
      children: [catchallRouteToParent],
    },
    {
      path: "settings",
      element: <Box>Settings</Box>,
      children: [catchallRouteToParent],
    },
    HuntDashboardRouteObject,
    catchallRouteToParent,
  ],
};
