import * as React from "react";
import { createRoot } from "react-dom/client";
import { ApolloClientProvider } from "./apolloClient/apolloClient";
import { AppRouter } from "./routes/appRouter";
import { TokenContextProvider } from "./src/shared/context/tokenContext/TokenContext";
import { StyleProvider } from "@ant-design/cssinjs";
import { ErrorContextProvider } from "./src/shared/context/errorContext/ErrorContext";

createRoot(document.getElementById("root")!).render(
  <StyleProvider hashPriority="high">
    <ApolloClientProvider>
      <TokenContextProvider>
        <AppRouter />
      </TokenContextProvider>
    </ApolloClientProvider>
  </StyleProvider>
);
