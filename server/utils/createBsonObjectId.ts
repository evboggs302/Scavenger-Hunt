import { Types } from "mongoose";

export const createBsonObjectId = (str?: string) => {
  if (str) {
    const objId = Types.ObjectId(str);
    return objId;
  } else {
    return new Types.ObjectId();
  }
};
