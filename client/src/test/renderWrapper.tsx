import type { ReactNode } from "react";
import { render, waitFor } from "@testing-library/react";
import {
  createMemoryRouter,
  type RouteObject,
  RouterProvider,
} from "react-router";
import { AppMUIProviders } from "@lib/context/AppMUIProviders";
import { ClueQryContextProvider } from "@lib/context/ClueContext";
import { HuntQryContextProvider } from "@lib/context/HuntContext";
import { TokenContextProvider } from "@lib/context/TokenContext";
import { UserQryContextProvider } from "@lib/context/UserContext";
import { ApolloClientProvider } from "@apolloClient/apolloClient";

type RenderOptions = RouteObject & { params?: Record<string, string> };

/**
 * Renders the given UI wrapped in necessary context providers and router.
 * @param ui - The React component to render.
 * @param options - Optional route configuration and parameters.
 * @param options.params - Parameters & their values to be used in the route. All provided values will be appended to the `/mock-hunt-id` path.
 * @returns The rendered component.
 */
export const renderWrapper = async (
  ui: ReactNode,
  options: RenderOptions = {}
) => {
  const { params = {}, ...rest } = options;

  const paramsResult = Object.entries(params).reduce(
    (acc, [paramDefinition, paramValue]) => ({
      ...acc,
      [paramDefinition]: paramValue || paramDefinition,
    }),
    {}
  );

  const path = `/:huntId/${Object.keys(paramsResult).join("/")}`;
  const entries = `/mock-hunt-id/${Object.values(paramsResult).join("/")}`;

  const router = createMemoryRouter(
    [
      {
        ...rest,
        path,
        element: (
          <ApolloClientProvider>
            <AppMUIProviders>
              <TokenContextProvider>
                <UserQryContextProvider>
                  <HuntQryContextProvider>
                    <ClueQryContextProvider>{ui}</ClueQryContextProvider>
                  </HuntQryContextProvider>
                </UserQryContextProvider>
              </TokenContextProvider>
            </AppMUIProviders>
          </ApolloClientProvider>
        ),
      },
    ],
    {
      initialEntries: [entries],
      initialIndex: 0,
    }
  );

  return await waitFor(() => {
    return render(<RouterProvider router={router} />);
  });
};
