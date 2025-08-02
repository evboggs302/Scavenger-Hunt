import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@lib/components/ErrorFallback/ErrorFallback";
import { HuntPage } from "@pages/hunt/HuntPage";
import { HuntDetails } from "@pages/hunt/info/HuntDetails";
import { TeamsPage } from "@pages/hunt/teams/TeamsPage";
import { CluesPage } from "@pages/hunt/clues/CluesPage";
import { ResponsesPage } from "@pages/hunt/responses/ResponsesPage";
import { ResultsPage } from "@pages/hunt/results/ResultsPage";
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
    {
      path: "results",
      element: (
        <ErrorBoundary
          fallbackRender={(fallbackProps) => (
            <ErrorFallback
              {...fallbackProps}
              message="There was a problem rendering the results page."
            />
          )}
        >
          <ResultsPage />
        </ErrorBoundary>
      ),
    },
    catchallRouteToParent,
  ],
};
