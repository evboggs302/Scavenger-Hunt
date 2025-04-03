import { PropsWithChildren } from "react";
import { MemoryRouter } from "react-router";
import { MockedProvider } from "@apollo/client/testing";
import { AppMUIProviders } from "@lib/context/AppMUIProviders";
import { ClueQryContextProvider } from "@lib/context/ClueContext";
import { HuntQryContextProvider } from "@lib/context/HuntContext";
import { TokenContextProvider } from "@lib/context/TokenContext";
import { UserQryContextProvider } from "@lib/context/UserContext";
import { InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({});

export const RenderWrapper = ({ children }: PropsWithChildren) => {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <AppMUIProviders>
        <MockedProvider cache={cache} mocks={[]} addTypename={false}>
          <TokenContextProvider>
            <UserQryContextProvider>
              <HuntQryContextProvider>
                <ClueQryContextProvider>{children}</ClueQryContextProvider>
              </HuntQryContextProvider>
            </UserQryContextProvider>
          </TokenContextProvider>
        </MockedProvider>
      </AppMUIProviders>
    </MemoryRouter>
  );
};
