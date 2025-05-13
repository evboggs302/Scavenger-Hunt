import { UserModel } from "../../models/users";
import { TokenModel } from "../../models/token_storage";
import { Resolvers } from "../../generated/graphql";
import { throwResolutionError } from "../../utils/apolloErrorHandlers";

const resolver: Resolvers = {
  Query: {
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
  },
};

export default { ...resolver };
