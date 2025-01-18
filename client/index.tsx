import { createRoot } from "react-dom/client";
import { ApolloClientProvider } from "@apolloClient/apolloClient";
import { AppRouter } from "@routes/AppRouter";
import { TokenContextProvider } from "@lib/context/TokenContext";
import { AppMUIProviders } from "@lib/context/AppMUIProviders";

createRoot(document.getElementById("root")!).render(
  <ApolloClientProvider>
    <AppMUIProviders>
      <TokenContextProvider>
        <AppRouter />
      </TokenContextProvider>
    </AppMUIProviders>
  </ApolloClientProvider>
);
