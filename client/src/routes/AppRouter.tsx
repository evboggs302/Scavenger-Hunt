import "./index.css";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router";
import { BaseApp } from "@features/baseApp/components/BaseApp";
import { catchallRouteToLogin } from "./catchAllRoutes/catchallRouteToLogin";
import { catchallRouteToParent } from "./catchAllRoutes/catchallRouteToParent";
import { AuthOutlet } from "@features/auth/components/AuthOutlet";
import { HuntPage } from "@features/hunts/components/HuntPage";
import { HuntDetails } from "@features/hunts/components/HuntDetails/HuntDetails";
import { TeamsPage } from "@features/teams/components/TeamsPage";
import { CluesPage } from "@features/clues/components/CluesPage";
import { ResponsesPage } from "@features/responses/components/ResponsesPage";
import { SignInCard } from "@features/auth/components/login/SignInCard";
import { SignUpCard } from "@features/auth/components/register/SignUpCard";
import { HomePage } from "@features/home/components/HomePage";
import { useTokenContext } from "@lib/context/TokenContext";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@lib/components/ErrorFallback/ErrorFallback";

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
          {
            index: true,
            element: (
              <ErrorBoundary
                fallbackRender={(fallbackProps) => (
                  <ErrorFallback
                    {...fallbackProps}
                    message="There was a problem rendering these details."
                  />
                )}
              >
                <HuntDetails />
              </ErrorBoundary>
            ),
          },
          {
            path: "teams",
            element: (
              <ErrorBoundary
                fallbackRender={(fallbackProps) => (
                  <ErrorFallback
                    {...fallbackProps}
                    message="There was a problem rendering the teams page."
                  />
                )}
              >
                <TeamsPage />
              </ErrorBoundary>
            ),
          },
          {
            path: "clues",
            element: (
              <ErrorBoundary
                fallbackRender={(fallbackProps) => (
                  <ErrorFallback
                    {...fallbackProps}
                    message="There was a problem rendering the clues page."
                  />
                )}
              >
                <CluesPage />
              </ErrorBoundary>
            ),
          },
          {
            path: "responses",
            element: (
              <ErrorBoundary
                fallbackRender={(fallbackProps) => (
                  <ErrorFallback
                    {...fallbackProps}
                    message="There was a problem rendering the responses page."
                  />
                )}
              >
                <ResponsesPage />
              </ErrorBoundary>
            ),
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
