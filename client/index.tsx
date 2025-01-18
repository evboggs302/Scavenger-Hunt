import { createRoot } from "react-dom/client";
import { ApolloClientProvider } from "@apolloClient/apolloClient";
import { AppRouter } from "@routes/AppRouter";
import { TokenContextProvider } from "@lib/context/TokenContext";
import { AppLocalizationProvider } from "@lib/context/AppLocalizationProvider";

createRoot(document.getElementById("root")!).render(
  <ApolloClientProvider>
    <AppLocalizationProvider>
      <TokenContextProvider>
        <AppRouter />
      </TokenContextProvider>
    </AppLocalizationProvider>
  </ApolloClientProvider>
);
