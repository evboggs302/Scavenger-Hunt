import EventLogModel from "../models/event_logs";
import { UnknownError } from "./apolloErrorHandlers";
import { createBsonObjectId } from "./createBsonObjectId";

export type EventLogProps = {
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
    if (err)
      return UnknownError("unable to save error to the logs");
  });
};
