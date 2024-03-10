import { GraphQLError } from "graphql";

export const ApolloAccessError = (message?: string) => {
  throw new GraphQLError(message || `Access error`, {
    extensions: {
      code: "ACCESS TOKEN ERROR",
      http: { status: 404 },
    },
  });
};
