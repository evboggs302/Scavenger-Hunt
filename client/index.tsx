import React from "react";
import { createRoot } from "react-dom/client";
import { ApolloClientProvider } from "./src/apolloClient/apolloClient";
import { AppRouter } from "./src/routes/appRouter";
import { TokenContextProvider } from "./src/lib/context/tokenContext/TokenContext";
import { StyleProvider } from "@ant-design/cssinjs";
import { AntGlobalsWrapper } from "./src/lib/context/antGlobals/AntGlobalsWrapper";

createRoot(document.getElementById("root")!).render(
  <StyleProvider hashPriority="high">
    <ApolloClientProvider>
      <AntGlobalsWrapper>
        <TokenContextProvider>
          <AppRouter />
        </TokenContextProvider>
      </AntGlobalsWrapper>
    </ApolloClientProvider>
  </StyleProvider>
);
