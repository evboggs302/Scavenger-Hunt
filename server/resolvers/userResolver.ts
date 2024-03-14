import { GraphQLError, GraphQLResolveInfo } from "graphql";
import { compareSync, hashSync } from "bcryptjs";
import UserModel from "../models/users";
import TokenStorageModel from "../models/token_storage";
import HuntModel from "../models/hunts";
import {
  AddUserInput,
  LoginInput,
  Resolvers,
  UserPayload,
} from "../generated/graphql";
import { createBsonObjectId } from "../utils/createBsonObjectId";
import { createAndSaveToken } from "../utils/jwt";
import { ApolloAccessError } from "../utils/apolloErrorHandlers";
import { throwResolutionError } from "../utils/eventLogHelpers";
import { returnedItems } from "../utils/returnedItems";

export const userResolver: Resolvers = {
  Query: {
    getAllUsers: async (_: unknown, {}, { user }) => {
      if (!user) return ApolloAccessError();
      const users = await UserModel.find({}).exec();
      return users.map(returnedItems);
    },
    getSingleUser: async (_: unknown, args: { uid: string }) => {
      const u_id = createBsonObjectId(args.uid);
      const user = await UserModel.findOne({ _id: u_id }).exec();
      if (!user) {
        return throwResolutionError({
          location: "createSingleUser",
          err: null,
          message: "User does not exist",
        });
      }
      return user.toObject();
    },
    userNameExists: async (_: unknown, args: { user_name: string }) => {
      const matches = await UserModel.find({ userName: args.user_name }).exec();
      return matches.length > 0;
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
  Mutation: {
    registerUser: async (_: unknown, args: { input: AddUserInput }) => {
      const { first_name, last_name, user_name, password } = args.input;
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

      return { __typename: "AuthPayload", token };
    },
    login: async (_: unknown, args: { input: LoginInput }) => {
      const { user_name, password } = args.input;
      const user = await UserModel.findOne({
        user_name: user_name,
      }).exec();
      if (!user) {
        throw new GraphQLError("User name does not exist", {
          extensions: {
            code: "USER DOES NOT EXIST",
            http: { status: 404 },
          },
        });
      } else if (!compareSync(password, user.hash)) {
        throw new GraphQLError("Incorrect Password", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      } else {
        const { _id } = user;
        const token = await createAndSaveToken(_id);

        return {
          __typename: "AuthPayload",
          token,
        };
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
