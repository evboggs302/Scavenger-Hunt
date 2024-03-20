import { ApolloError } from "apollo-server-errors";
import { EventLogProps, createErrLog } from "./eventLogHelpers";

const defaultErrMessage = `Uh-oh! An error occured.`;

export const ApolloAccessError = async (message?: string) => {
  await createErrLog({ err: null, location: "middleware", message });
  throw new ApolloError(message || defaultErrMessage, "ACCESS_ERROR", {
    http: { status: 400 },
  });
};

export const throwResolutionError = async ({
  err,
  location,
  message,
}: EventLogProps) => {
  await createErrLog({ err, location, message });
  throw new ApolloError(
    message || defaultErrMessage,
    "OPERATION_RESOLUTION_FAILURE",
    {
      location,
      errMessage: message,
    }
  );
};

export const throwServerError = async ({
  err,
  location,
  message,
}: EventLogProps) => {
  await createErrLog({ err, location, message });
  throw new ApolloError(message || defaultErrMessage, "INTERNAL_SERVER_ERROR", {
    code: "INTERNAL_SERVER_ERROR",
    location,
    errMessage: message,
  });
};
