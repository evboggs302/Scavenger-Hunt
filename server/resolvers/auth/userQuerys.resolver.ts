import { UserModel } from "../../models/users";
import { TokenModel } from "../../models/token_storage";
import { HuntModel } from "../../models/hunts";
import { returnedItems } from "../../utils/transforms/returnedItems";
import { AllUsersPayload, Resolvers } from "../../generated/graphql";
import { createBsonObjectId } from "../../utils/transforms/createBsonObjectId";
import {
  AuthenticationError,
  throwResolutionError,
} from "../../utils/apolloErrorHandlers";

const userResolver: Resolvers = {
  Query: {
    getAllUsers: async (
      _parent: unknown,
      _args,
      { user },
      { operation: { name } }
    ) => {
      if (!user) {
        return AuthenticationError({
          message: "No user stored on server.",
          location: name?.value,
        });
      }
      const users = await UserModel.find({}).select({ hash: 0 }).exec();
      return users.map(returnedItems);
    },
    getUserFromToken: async (
      _parent: unknown,
      _args,
      { token },
      { operation: { name } }
    ) => {
      const doc = await TokenModel.findOne({ token })
        .select({ issuedToUser: 1 })
        .exec();
      if (!doc) {
        return throwResolutionError({
          location: name?.value,
          message: "Token does not exist.",
        });
      }

      const user = await UserModel.findById(doc.issuedToUser).exec();
      if (!user) {
        return throwResolutionError({
          location: name?.value,
          message: "User does not exist.",
        });
      }

      return user.transformWithoutHash();
    },
    userNameExists: async (_parent: unknown, { user_name }) => {
      const matches = await UserModel.findUsername(user_name);
      return matches.length > 0;
    },
  },
  AllUsersPayload: {
    hunts: async (parent: AllUsersPayload) => {
      const created_by = createBsonObjectId(parent._id);
      return await HuntModel.find({
        created_by,
      });
    },
  },
};

export default { ...userResolver };
