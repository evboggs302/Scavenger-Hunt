import React from "react";
import { initialize, mswLoader } from "msw-storybook-addon";
import { Decorator } from "@storybook/react";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";
import { ApolloClientProvider } from "../src/apolloClient/apolloClient";
import { DarkThemeProvider } from "../src/lib/context/DarkThemeProvider";
import { TokenContextProvider } from "../src/lib/context/TokenContext";
import { UserQryContextProvider } from "../src/lib/context/UserContext";
import { HuntQryContextProvider } from "../src/lib/context/HuntContext";
import { ClueQryContextProvider } from "../src/lib/context/ClueContext";
import { mswHandlers } from "../msw/mswHandlers";
import { AppLocalizationProvider } from "../src/lib/context/AppLocalizationProvider";

// MSW Initialize
initialize({
  onUnhandledRequest: "bypass",
  quiet: false,
});

// needed for MSW to intercept calls
export const loaders = [mswLoader];

export const parameters = {
  msw: {
    handlers: { ...mswHandlers },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  reactRouter: reactRouterParameters({
    routing: { path: "*", useStoryElement: true },
  }),
  // screenshot: {
  //   viewport: {
  //     width: 1250,
  //     height: 1000,
  //     deviceScaleFactor: 2,
  //   },
  //   fullPage: false,
  //   captureBeyondViewport: true,
  // },
};

const ApolloClientContextDecorators: Decorator = (Story, context) => {
  return (
    <DarkThemeProvider>
      <ApolloClientProvider>
        <AppLocalizationProvider>
          <TokenContextProvider>
            <UserQryContextProvider>
              <HuntQryContextProvider>
                <ClueQryContextProvider>{Story()}</ClueQryContextProvider>
              </HuntQryContextProvider>
            </UserQryContextProvider>
          </TokenContextProvider>
        </AppLocalizationProvider>
      </ApolloClientProvider>
    </DarkThemeProvider>
  );
};

export const decorators: Decorator[] = [
  ApolloClientContextDecorators,
  withRouter,
];
