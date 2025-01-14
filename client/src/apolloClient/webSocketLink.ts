import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

export const webSocketLink = new GraphQLWsLink(
  createClient({
    url: `${process.env.SERVER_URL_SUBSCRIPTION}`,
    connectionParams: {
      authentication: localStorage.getItem("BEARER_TOKEN"),
    },
  })
);
