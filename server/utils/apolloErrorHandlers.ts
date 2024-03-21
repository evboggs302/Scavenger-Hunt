import { GraphQLError } from "graphql";
import { EventLogProps, createErrLog } from "./eventLogHelpers";

const defaultErrMessage = `Uh-oh! An error occured.`;

export const ApolloAccessError = async (message?: string) => {
  await createErrLog({ err: null, location: "middleware", message });
  throw new GraphQLError(message || defaultErrMessage, {
    extensions: {
      code: "ACCESS_ERROR",
      http: { status: 404 },
    },
  });
};

export const throwResolutionError = async ({
  err,
  location,
  message,
}: EventLogProps) => {
  await createErrLog({ err, location, message });
  throw new GraphQLError(message || defaultErrMessage, {
    extensions: {
      code: "OPERATION_RESOLUTION_FAILURE",
      location,
      errMessage: message,
    },
  });
};

export const throwServerError = async ({
  err,
  location,
  message,
}: EventLogProps) => {
  await createErrLog({ err, location, message });
  throw new GraphQLError(defaultErrMessage, {
    extensions: {
      code: "INTERNAL_SERVER_ERROR",
      location,
      errMessage: message,
    },
  });
};
