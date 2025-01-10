import { UserModel } from "../models/users";
import { TokenModel } from "../models/token_storage";
import { HuntModel } from "../models/hunts";
import { compareSync, hashSync } from "bcryptjs";
import { createAndSaveToken } from "../utils/jwt";
import { returnedItems } from "../utils/transforms/returnedItems";
import { AllUsersPayload, Resolvers } from "../generated/graphql";
import { createBsonObjectId } from "../utils/transforms/createBsonObjectId";
import {
  AuthenticationError,
  throwResolutionError,
  throwServerError,
} from "../utils/apolloErrorHandlers";

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
      { tkn },
      _ctxt,
      { operation: { name } }
    ) => {
      const doc = await TokenModel.findOne({ token: tkn })
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
