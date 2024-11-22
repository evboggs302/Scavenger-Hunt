import React from "react";
import { createRoot } from "react-dom/client";
import { ApolloClientProvider } from "./src/apolloClient/apolloClient";
import { AppRouter } from "./src/routes/ApplicationRouter";
import { TokenContextProvider } from "./src/lib/context/TokenContext";

createRoot(document.getElementById("root")!).render(
  <ApolloClientProvider>
    <TokenContextProvider>
      <AppRouter />
    </TokenContextProvider>
  </ApolloClientProvider>
);
