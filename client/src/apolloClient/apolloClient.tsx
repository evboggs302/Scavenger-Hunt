import { PropsWithChildren } from "react";
import {
  ApolloClient,
  ApolloProvider,
  from,
  InMemoryCache,
  createHttpLink,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { webSocketLink } from "./webSocketLink";
import { errorLink } from "./errorLink";
import { authLink } from "./authLink";

const httpLink = createHttpLink({
  uri: `${process.env.SERVER_URL_GQL}`,
  fetch: (uri, options) => {
    const { operationName } = JSON.parse(options?.body as string);
    return fetch(`${uri}?opName=${operationName}`, options);
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  webSocketLink,
  httpLink
);

export const client = new ApolloClient({
  name: "digital-scavenger-client",
  link: from([errorLink, authLink, splitLink]),
  cache: new InMemoryCache(),
  devtools: {
    name: "digital-scavenger-client",
    enabled: process.env.NODE_ENV === "development",
  },
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});

export const ApolloClientProvider = ({ children }: PropsWithChildren) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
