import { GraphQLError } from "graphql";
import EventLogModel from "../models/event_logs";
import { createBsonObjectId } from "./createBsonObjectId";

type EventLogProps = {
  err: unknown;
  location: string;
  message?: string;
};
export const createErrLog = async ({
  err,
  location,
  message,
}: EventLogProps) => {
  const timeStamp = new Date();
  const newLog = new EventLogModel({
    _id: createBsonObjectId(),
    type: "ERROR",
    location,
    time_stamp: timeStamp,
    body: {
      message,
      err,
    },
  });
  await newLog.save().catch((err) => {
    if (err) console.log("LOG ERR:", err);
  });
};

export const throwResolutionError = async ({
  err,
  location,
  message,
}: EventLogProps) => {
  await createErrLog({ err, location, message });
  throw new GraphQLError(message || `Uh-oh! An error occured.`, {
    extensions: {
      code: "OPERATION_RESOLUTION_FAILURE",
      where: location,
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
  throw new GraphQLError(`Uh-oh! An error occured.`, {
    extensions: {
      code: "INTERNAL_SERVER_ERROR",
      where: location,
      errMessage: message,
    },
  });
};
