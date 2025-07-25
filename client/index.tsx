import * as Sentry from "@sentry/react";
import { createRoot } from "react-dom/client";
import { ApolloClientProvider } from "@apolloClient/apolloClient";
import { AppRouter } from "@routes/AppRouter";
import { TokenContextProvider } from "@lib/context/TokenContext";
import { AppMUIProviders } from "@lib/context/AppMUIProviders";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: window.location.hostname,
  beforeSend(event) {
    if (process.env.PROD) {
      // Only send events from prod env
      return event;
    }
    return null;
  },
});

createRoot(document.getElementById("root")!).render(
  <ApolloClientProvider>
    <AppMUIProviders>
      <TokenContextProvider>
        <AppRouter />
      </TokenContextProvider>
    </AppMUIProviders>
  </ApolloClientProvider>
);
