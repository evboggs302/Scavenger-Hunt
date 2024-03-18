import * as React from "react";
import { createRoot } from "react-dom/client";
import { ApolloClientProvider } from "./apolloClient";
import { AppRouter } from "./routes/appRouter";
import { UserContextProvider } from "./src/shared/user/UserContextProvider";

createRoot(document.getElementById("root")!).render(
  <UserContextProvider>
    <ApolloClientProvider>
      <AppRouter />
    </ApolloClientProvider>
  </UserContextProvider>
);
