import { LogModel } from "@models/event_logs";
import { throwServerError } from "./apolloErrorHandlers";
import { createBsonObjectId } from "./transforms/createBsonObjectId";

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
  const newLog = new LogModel({
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
      return throwServerError({
        err,
        location: "createErrLog",
        message: "unable to save error to the logs",
      });
  });
};
