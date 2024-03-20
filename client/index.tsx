import * as React from "react";
import { createRoot } from "react-dom/client";
import { ApolloClientProvider } from "./apolloClient/apolloClient";
import { AppRouter } from "./routes/appRouter";
import { TokenContextProvider } from "./src/shared/context/tokenManagement/TokenContext";
import { StyleProvider } from "@ant-design/cssinjs";

createRoot(document.getElementById("root")!).render(
  <ApolloClientProvider>
    <StyleProvider hashPriority="high">
      <TokenContextProvider>
        <AppRouter />
      </TokenContextProvider>
    </StyleProvider>
  </ApolloClientProvider>
);
