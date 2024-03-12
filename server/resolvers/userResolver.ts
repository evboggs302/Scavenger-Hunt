import { GraphQLError, GraphQLResolveInfo } from "graphql";
import { compareSync, hashSync } from "bcryptjs";
import UserModel from "../models/users";
import TokenStorageModel from "../models/token_storage";
import HuntModel from "../models/hunts";
import {
  AddUserInput,
  FullUser,
  LoginInput,
  Resolvers,
  UserPayload,
} from "../generated/graphql";
import { createBsonObjectId } from "../utils/createBsonObjectId";
import { setToken, verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { ApolloAccessError } from "../utils/apolloErrorHandlers";
import { createErrEvent } from "../utils/eventLogHelpers";
import { ServerContext } from "../utils/apolloServerMiddlewareOptions";

const userResolver: Resolvers = {
  Query: {
    getAllUsers: async (_: unknown, {}, { user }) => {
      if (!user) return ApolloAccessError();
      const users = await UserModel.find({}).exec();
      return users.map((usr) => ({
        ...usr,
        __typename: "UserPayload",
        _id: `${usr._id}`,
      }));
    },
    getSingleUser: async (_: unknown, args: { uid: string }) => {
      const u_id = createBsonObjectId(args.uid);
      const user = await UserModel.findOne({ _id: u_id }).exec();
      if (!user) {
        throw new GraphQLError("User does not exist", {
          extensions: {
            code: "USER DOES NOT EXIST",
            http: { status: 404 },
          },
        });
      }
      return {
        ...user,
        __typename: "UserPayload",
        _id: `${user._id}`,
      };
    },
    userNameExists: async (_: unknown, args: { user_name: string }) => {
      const matches = await UserModel.find({ userName: args.user_name }).exec();
      return matches.length > 0;
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
        password: hashedPw,
      });
      await user.save();

      const savedUser = await UserModel.findOne({ _id: u_id })
        .select({ hash: 0 })
        .exec();
      const token = savedUser && setToken({ u_id: `${savedUser._id}` });

      if (!token) {
        throw new GraphQLError("Unable to create token", {
          extensions: {
            code: "TOKEN ISSUE",
            http: { status: 404 },
          },
        });
      }

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
        const token = setToken({ u_id: `${_id}` });

        return {
          __typename: "AuthPayload",
          token,
        };
      }
    },
    logout: async (
      _: unknown,
      {},
      context: ServerContext,
      info: GraphQLResolveInfo
    ) => {
      const { token, user } = context;

      if (!user || !user.u_id || !user.iat || !user.exp) {
        createErrEvent({
          location: "logout",
          err: {
            message: "token issue or no user",
            context,
          },
        });
        return false;
      }

      const { u_id, iat, exp } = user;
      try {
        const issuedDate = new Date(iat * 1000);
        const expireyDate = new Date(exp * 1000);
        const oldTtoken = new TokenStorageModel({
          token,
          issuedToUser: u_id,
          issuedAt: issuedDate,

          expireAt: expireyDate,
        });
        await oldTtoken.save();
        return true;
      } catch (err) {
        createErrEvent({ location: "logout", err });
        return false;
      }
    },
  },
  UserPayload: {
    hunts: async (parent: UserPayload) => {
      const _id = createBsonObjectId(parent._id);
      const hunts = await HuntModel.find({
        created_by: _id,
      }).exec();
      return hunts.map((el) => ({
        ...el,
        __typename: "Hunt",
        _id: `${el._id}`,
        created_by: `${el.created_by}`,
        created_date: el.created_date.toISOString(),
        start_date: el.start_date.toISOString(),
        end_date: el.end_date.toISOString(),
      }));
    },
  },
};

export default userResolver;
