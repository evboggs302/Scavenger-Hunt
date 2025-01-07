import { createBsonObjectId } from "../../utils/transforms/createBsonObjectId";
import { Types } from "mongoose";

describe("createBsonObjectId", () => {
  test("no argument", () => {
    const bsonObj = createBsonObjectId();
    expectTypeOf(bsonObj).toEqualTypeOf<Types.ObjectId>();
  });
  test("string argument", () => {
    const bsonObj = createBsonObjectId("677c390b938d16151238f0f1");
    expectTypeOf(bsonObj).toEqualTypeOf<Types.ObjectId>();
  });
});
