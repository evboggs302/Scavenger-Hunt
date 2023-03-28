import { GraphQLError } from "graphql";
import EventLogModel from "../models/event_logs";
import { createBsonObjectId } from "./createBsonObjectId";

type CreateEventLogProps = {
  location: string;
  err: unknown;
};
export const createErrEvent = async ({
  location,
  err,
}: CreateEventLogProps) => {
  const timeStamp = new Date();
  const newLog = new EventLogModel({
    _id: createBsonObjectId(),
    type: "ERROR",
    where: location,
    time_stamp: timeStamp,
    body: err,
  });
  await newLog.save((err) => {
    if (err) console.log("LOG ERR:", err);
  });

  throw new GraphQLError("Uh-oh! An error occured.", {
    extensions: {
      code: "CAUGHT_ERR",
      where: location,
      errMessage: err,
    },
  });
};
