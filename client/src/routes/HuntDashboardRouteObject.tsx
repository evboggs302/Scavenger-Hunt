import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@lib/components/ErrorFallback/ErrorFallback";
import { HuntPage } from "@pages/hunt/HuntPage";
import { HuntDetails } from "@features/hunts/components/HuntDetails/HuntDetails";
import { TeamsPage } from "@features/teams/components/TeamsPage";
import { CluesPage } from "@features/clues/components/CluesPage";
import { ResponsesPage } from "@features/responses/components/ResponsesPage";
import { catchallRouteToParent } from "./catchAllRoutes/catchallRouteToParent";
import { HuntQryContextProvider } from "@lib/context/HuntContext";
import { ClueQryContextProvider } from "@lib/context/ClueContext";

export const HuntDashboardRouteObject = {
  path: "hunt/:huntId",
  element: (
    <ErrorBoundary
      fallbackRender={(fallbackProps) => (
        <ErrorFallback
          {...fallbackProps}
          message="There was a problem rendering your hunt."
        />
      )}
    >
      <HuntQryContextProvider>
        <ClueQryContextProvider>
          <HuntPage />
        </ClueQryContextProvider>
      </HuntQryContextProvider>
    </ErrorBoundary>
  ),
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
};
