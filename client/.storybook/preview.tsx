import React from "react";
import { initialize, mswDecorator, mswLoader } from "msw-storybook-addon";
import { Decorator } from "@storybook/react";
import { StyleProvider } from "@ant-design/cssinjs";
import { MemoryRouter } from "react-router-dom";
import { ApolloClientProvider } from "../apolloClient/apolloClient";
import { UserQryContextProvider } from "../src/shared/context/user/context/UserQryContextProvider";
import { mswHandlers } from "./mswHandlers";

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
  screenshot: {
    viewport: {
      width: 1250,
      height: 1000,
      deviceScaleFactor: 2,
    },
    fullPage: false,
    captureBeyondViewport: true,
  },
};

const AntStylesContextDecorator: Decorator = (Story, context) => {
  return (
    <StyleProvider hashPriority="high">
      <Story />
    </StyleProvider>
  );
};

const RouterDecorator: Decorator = (Story, context) => {
  return <MemoryRouter>{Story()}</MemoryRouter>;
};

const ApolloClientContextDecorators: Decorator = (Story, context) => {
  return (
    <ApolloClientProvider>
      <UserQryContextProvider>{Story()}</UserQryContextProvider>
    </ApolloClientProvider>
  );
};

export const decorators: Decorator[] = [
  mswDecorator, // needed for specific stories to override existing mocks
  ApolloClientContextDecorators,
  AntStylesContextDecorator,
  RouterDecorator,
];
