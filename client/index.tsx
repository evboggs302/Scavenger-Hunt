import * as React from "react";
import { createRoot } from "react-dom/client";
import { ApolloClientProvider } from "./apolloClient";
import { AppRouter } from "./routes/appRouter";
import { TokenContextProvider } from "./src/shared/tokenManagement/TokenContext";

createRoot(document.getElementById("root")!).render(
  <ApolloClientProvider>
    <TokenContextProvider>
      <AppRouter />
    </TokenContextProvider>
  </ApolloClientProvider>
);
