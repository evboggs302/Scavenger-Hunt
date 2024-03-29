import React, { PropsWithChildren } from "react";
import {
  ApolloClient,
  ApolloProvider,
  from,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, path }) =>
      console.log(`[GraphQL error]: Message: ${message}; Path: ${path}`)
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = createHttpLink({
  uri: `${process.env.GQL_SERVER_URL}`,
  fetch: (uri, options) => {
    const { operationName } = JSON.parse(options?.body as string);
    return fetch(`${uri}?opName=${operationName}`, options);
  },
});

export const client = new ApolloClient({
  name: "digital-scavenger-client",
  link: from([errorLink, httpLink]),
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
