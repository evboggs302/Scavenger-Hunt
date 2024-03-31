import { Types } from "mongoose";

export const createBsonObjectId = (str?: string | null) => {
  if (str) {
    const objId = new Types.ObjectId(str);
    return objId;
  } else {
    return new Types.ObjectId();
  }
};
