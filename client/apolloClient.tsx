import React, { PropsWithChildren } from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

export const httpLink = createHttpLink({
  uri: `${process.env.GQL_SERVER_URL}`,
  fetch: (uri, options) => {
    const { operationName } = JSON.parse(options?.body as string);
    return fetch(`${uri}?opName=${operationName}`, options);
  },
});

export const client = new ApolloClient({
  name: "scavenger-web-client",
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});

export const ApolloClientProvider = ({ children }: PropsWithChildren) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
