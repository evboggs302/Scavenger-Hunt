import React, { PropsWithChildren, ReactNode } from "react";
import { render as tlrRender, RenderOptions } from "@testing-library/react";
import { StyleProvider } from "@ant-design/cssinjs";
import { AntGlobalsWrapper } from "../shared/context/antGlobals/AntGlobalsWrapper";
import { TokenContext } from "../shared/context/tokenContext/TokenContext";
import { ApolloClientProvider } from "../../apolloClient/apolloClient";
import { BrowserRouter } from "react-router-dom";

const AllTheProviders = ({ children }: PropsWithChildren) => {
  return (
    <StyleProvider hashPriority="high">
      <ApolloClientProvider>
        <AntGlobalsWrapper>
          <TokenContext.Provider
            value={{
              token: "default-token",
              setToken: () => {},
            }}>
            <BrowserRouter>{children}</BrowserRouter>
          </TokenContext.Provider>
        </AntGlobalsWrapper>
      </ApolloClientProvider>
    </StyleProvider>
  );
};

export const render = (
  comp: ReactNode,
  options: Omit<RenderOptions, "wrapper">
) => tlrRender(comp, { wrapper: AllTheProviders, ...options });
export { default as userEvent } from "@testing-library/user-event";
