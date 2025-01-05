import { Types } from "mongoose";

export const createBsonObjectId = (str?: string | null) => {
  if (str) {
    return new Types.ObjectId(str);
  } else {
    return new Types.ObjectId();
  }
};
