import { UserModel } from "../../models/users";
import { TokenModel } from "../../models/token_storage";
import { compareSync, hashSync } from "bcryptjs";
import { createAndSaveToken } from "../../utils/jwt";
import { Resolvers } from "../../generated/graphql";
import { createBsonObjectId } from "../../utils/transforms/createBsonObjectId";
import {
  AuthenticationError,
  throwResolutionError,
  throwServerError,
} from "../../utils/apolloErrorHandlers";

const userResolver: Resolvers = {
  Mutation: {
    registerUser: async (
      _parent: unknown,
      { input: { first_name, last_name, user_name, password } },
      _ctxt,
      { operation: { name } }
    ) => {
      const hashedPw = hashSync(password, 15);
      const u_id = createBsonObjectId();
      const user = new UserModel({
        _id: u_id,
        first_name,
        last_name,
        user_name,
        hash: hashedPw,
      });
      await user.save();

      const token = await createAndSaveToken(u_id);
      const newFoundUser = await UserModel.findById(u_id);

      if (!newFoundUser) {
        return throwResolutionError({
          location: name?.value,
          message: "Unable to find the newly saved user.",
        });
      }

      const tkn = await TokenModel.findOne({ token });

      if (!tkn) {
        return throwResolutionError({
          location: name?.value,
          message: "Unable to find the newly saved user.",
        });
      }

      return tkn.transformWithTypename();
    },
    login: async (
      _parent: unknown,
      { input: { user_name, password } },
      _ctxt,
      { operation: { name } }
    ) => {
      const user = await UserModel.getUserForLogin(user_name);
      if (!user) {
        return AuthenticationError({
          message: "Username does not exist.",
          location: name?.value,
        });
      } else if (!compareSync(password, user.hash)) {
        return AuthenticationError({
          message: "Incorrect password.",
          location: name?.value,
        });
      } else {
        const token = await createAndSaveToken(user._id);
        const tkn = await TokenModel.findOne({ token });

        if (!tkn) {
          return throwResolutionError({
            message: "Unable to find the newly saved user.",
            location: name?.value,
          });
        }

        return tkn.transformWithTypename();
      }
    },
    logout: async (
      _parent: unknown,
      _args,
      { token, user },
      { operation: { name } }
    ) => {
      try {
        await TokenModel.deleteOne({
          token,
          issuedToUser: user._id.toString(),
        });
        return true;
      } catch (err) {
        return throwServerError({
          err,
          message: "Unable to logout at this time.",
          location: name?.value,
        });
      }
    },
  },
};

export default { ...userResolver };
