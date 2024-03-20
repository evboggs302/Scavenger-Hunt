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
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
      return { message, locations, path };
    });
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const httpLink = createHttpLink({
  uri: `${process.env.GQL_SERVER_URL}`,
  // fetch: (uri, options) => {
  //   console.log(uri);
  //   const { operationName } = JSON.parse(options?.body as string);
  //   return fetch(`${uri}?opName=${operationName}`, options);
  // },
});

export const client = new ApolloClient({
  name: "scavenger-web-client",
  // link: from([httpLink, errorLink]),
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
