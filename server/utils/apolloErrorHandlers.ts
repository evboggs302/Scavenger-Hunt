import { GraphQLError } from "graphql";
import { createErrLog } from "./eventLogHelpers";

type CustomGraphQLErrorArgs = {
  err?: unknown;
  location?: string;
  message: string;
};

export const AuthenticationError = async ({
  err = null,
  location = "Authentication error on server.",
  message,
}: CustomGraphQLErrorArgs) => {
  await createErrLog({
    err,
    location,
    message,
  });
  throw new GraphQLError(message, {
    extensions: {
      code: "UNAUTHENTICATED",
      location,
    },
  });
};

export const throwResolutionError = async ({
  err = null,
  location = "resolvers",
  message,
}: CustomGraphQLErrorArgs) => {
  await createErrLog({ err, location, message });
  throw new GraphQLError(message, {
    extensions: {
      code: "OPERATION_RESOLUTION_FAILURE",
      location,
    },
  });
};

export const throwServerError = async ({
  err = null,
  location = "server",
  message,
}: CustomGraphQLErrorArgs) => {
  await createErrLog({ err, location, message });
  throw new GraphQLError(message, {
    extensions: {
      code: "INTERNAL_SERVER_ERROR",
      location,
    },
  });
};
