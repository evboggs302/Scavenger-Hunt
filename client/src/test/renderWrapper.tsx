import { PropsWithChildren } from "react";
import { MemoryRouter } from "react-router";
import { ApolloClientProvider } from "@apolloClient/apolloClient";
import { AppMUIProviders } from "@lib/context/AppMUIProviders";
import { ClueQryContextProvider } from "@lib/context/ClueContext";
import { HuntQryContextProvider } from "@lib/context/HuntContext";
import { TokenContextProvider } from "@lib/context/TokenContext";
import { UserQryContextProvider } from "@lib/context/UserContext";

export const renderWrapper = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <AppMUIProviders>
        <ApolloClientProvider>
          <TokenContextProvider>
            <UserQryContextProvider>
              <HuntQryContextProvider>
                <ClueQryContextProvider>{children}</ClueQryContextProvider>
              </HuntQryContextProvider>
            </UserQryContextProvider>
          </TokenContextProvider>
        </ApolloClientProvider>
      </AppMUIProviders>
    </MemoryRouter>
  );
};
