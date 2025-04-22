import { LogModel } from "../models/event_logs";
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
  await LogModel.create({
    _id: createBsonObjectId(),
    type: "ERROR",
    location,
    time_stamp: timeStamp,
    body: {
      message,
      err,
    },
  }).catch((err) => {
    if (err)
      return throwServerError({
        location: "createErrLog",
        message: "unable to save error to the logs",
        err,
      });
  });
};
