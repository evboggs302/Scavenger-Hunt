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
  AuthError,
  InvalidInputError,
  NotFoundError,
  UnknownError,
} from "../utils/apolloErrorHandlers";

export const userResolver: Resolvers = {
  Query: {
    getAllUsers: async (_: unknown, {}, { user }) => {
      if (!user) {
        const err = await NotFoundError("No user found.");
        return err;
      }
      const users = await UserModel.find({}).select({ hash: 0 }).exec();
      return users.map(returnedItems);
    },
    getUserFromToken: async (_: unknown, { tkn }) => {
      const doc = await TokenStorageModel.findOne({ token: tkn })
        .select({ issuedToUser: 1 })
        .exec();
      if (!doc) {
        const err = await AuthError("Token does not exist.");
        return err;
      }

      const user = await UserModel.findById(doc.issuedToUser).exec();
      if (!user) {
        return throwResolutionError({
          location: "getUserFromToken",
          err: null,
          message: "User does not exist",
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
      { input: { first_name, last_name, user_name, password } }
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
          location: "registerUser",
          err: "unable to find the newly saved user",
        });
      }

      const tkn = await TokenStorageModel.findOne({ token });

      if (!tkn) {
        return throwResolutionError({
          location: "registerUser",
          err: "unable to find the newly saved user",
        });
      }

      return tkn.toObject();
    },
    login: async (_: unknown, { input: { user_name, password } }) => {
      const user = await UserModel.getUserForLogin(user_name);
      if (!user) {
        return await NotFoundError(
          "No user exists for that username.",
          "login"
        );
      } else if (!compareSync(password, user.hash)) {
        return await InvalidInputError("Incorrect password", "login");
      } else {
        const token = await createAndSaveToken(user._id);
        const tkn = await TokenStorageModel.findOne({ token }).exec();

        if (!tkn) {
          return await UnknownError(
            "Unable to find the newly saved user",
            "login"
          );
        }

        return tkn.toObject();
      }
    },
    logout: async (_: unknown, {}, { token, user }) => {
      try {
        await TokenStorageModel.deleteOne({
          token,
          issuedToUser: user._id.toString(),
        });
        return true;
      } catch (err) {
        return throwResolutionError({ location: "logout", err });
      }
    },
  },
  UserPayload: {
    hunts: async (parent: UserPayload) => {
      const _id = createBsonObjectId(parent._id);
      const hunts = await HuntModel.find({
        created_by: _id,
      }).exec();
      return hunts.map(returnedItems);
    },
  },
};
