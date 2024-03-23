import UserModel from "../models/users";
import TokenStorageModel from "../models/token_storage";
import HuntModel from "../models/hunts";
import { GraphQLError } from "graphql";
import { compareSync, hashSync } from "bcryptjs";
import { createAndSaveToken } from "../utils/jwt";
import { returnedItems } from "../utils/returnedItems";
import { Resolvers, UserPayload } from "../generated/graphql";
import { createBsonObjectId } from "../utils/createBsonObjectId";
import {
  AuthenticationError,
  throwResolutionError,
  throwServerError,
} from "../utils/apolloErrorHandlers";

export const userResolver: Resolvers = {
  Query: {
    getAllUsers: async (_: unknown, {}, { user }, { operation: { name } }) => {
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
      _: unknown,
      { tkn },
      _ctxt,
      { operation: { name } }
    ) => {
      const doc = await TokenStorageModel.findOne({ token: tkn })
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

      return user.toObject();
    },
    // checkForToken: async (_: unknown, {}, { token }) => {
    //   return token || false;
    // },
    userNameExists: async (_: unknown, { user_name }) => {
      const matches = await UserModel.findUsername(user_name);
      return matches.length > 0;
    },
  },
  Mutation: {
    registerUser: async (
      _: unknown,
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

      const tkn = await TokenStorageModel.findOne({ token });

      if (!tkn) {
        return throwResolutionError({
          location: name?.value,
          message: "Unable to find the newly saved user.",
        });
      }

      return tkn.toObject();
    },
    login: async (
      _: unknown,
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
        const tkn = await TokenStorageModel.findOne({ token });

        if (!tkn) {
          return throwResolutionError({
            message: "Unable to find the newly saved user.",
            location: name?.value,
          });
        }

        return tkn.toObject();
      }
    },
    logout: async (
      _: unknown,
      {},
      { token, user },
      { operation: { name } }
    ) => {
      try {
        await TokenStorageModel.deleteOne({
          token,
          issuedToUser: user._id.toString(),
        });
        return true;
      } catch (err) {
        return throwServerError({
          message: "Unable to logout at this time.",
          location: name?.value,
        });
      }
    },
  },
  UserPayload: {
    hunts: async (parent: UserPayload) => {
      const _id = createBsonObjectId(parent._id);
      return await HuntModel.find({
        created_by: _id,
      });
    },
  },
};
