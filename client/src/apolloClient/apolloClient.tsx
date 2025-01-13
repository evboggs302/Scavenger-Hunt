import React, { PropsWithChildren } from "react";
import {
  ApolloClient,
  ApolloProvider,
  from,
  InMemoryCache,
  createHttpLink,
  split,
  ApolloLink,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, path }) =>
      console.log(`[GraphQL error]: Message: ${message}; Path: ${path}`)
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    return {
      headers: {
        ...headers,
        "Access-Control-Allow-Origin": `${process.env.CLIENT_URL}`,
        authorization: localStorage.getItem("BEARER_TOKEN"),
      },
    };
  });
  return forward(operation);
});

const httpLink = createHttpLink({
  uri: `${process.env.SERVER_URL_GQL}`,
  fetch: (uri, options) => {
    const { operationName } = JSON.parse(options?.body as string);
    return fetch(`${uri}?opName=${operationName}`, options);
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${process.env.SERVER_URL_SUBSCRIPTION}`,
    connectionParams: {
      authentication: localStorage.getItem("BEARER_TOKEN"),
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  name: "digital-scavenger-client",
  link: from([errorLink, authLink, splitLink]),
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
