import React from "react";
import { initialize, mswDecorator, mswLoader } from "msw-storybook-addon";
import { Decorator } from "@storybook/react";
import { withRouter } from "storybook-addon-remix-react-router";
import { ApolloClientProvider } from "../src/apolloClient/apolloClient";
import { TokenContextProvider } from "../src/lib/context/TokenContext";
// import { UserQryContextProvider } from "../src/lib/context/userContext/context/UserQryContextProvider";
// import { HuntQryContextProvider } from "../src/lib/context/huntContext/HuntQryContextProvider";
// import { ClueQryContextProvider } from "../src/lib/context/clueContext/ClueQryContextProvider";
import { mswHandlers } from "../msw/mswHandlers";

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
    <ApolloClientProvider>
      <TokenContextProvider>
        {/* <UserQryContextProvider> */}
        {/* <HuntQryContextProvider> */}
        {/* <ClueQryContextProvider> */}
        {Story()}
        {/* </ClueQryContextProvider> */}
        {/* </HuntQryContextProvider> */}
        {/* </UserQryContextProvider> */}
      </TokenContextProvider>
    </ApolloClientProvider>
  );
};

export const decorators: Decorator[] = [
  withRouter,
  mswDecorator, // needed for specific stories to override existing mocks
  ApolloClientContextDecorators,
];
