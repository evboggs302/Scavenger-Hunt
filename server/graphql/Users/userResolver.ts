import { GraphQLError } from "graphql";
import { compareSync, hashSync } from "bcryptjs";
import UserModel from "../../models/users";
import TokenStorageModel from "../../models/token_storage";
import HuntModel from "../../models/hunts";
import {
  AddUserInput,
  Hunt,
  Resolvers,
  UserPayload,
} from "../../generated/graphql";
import { createBsonObjectId } from "../../utils/createBsonObjectId";
import { setToken, verifyToken } from "../jwt";
import { JwtPayload } from "jsonwebtoken";
import { ApolloAccessError } from "../errors";

const userResolver: Resolvers = {
  Query: {
    getAllUsers: async (_, {}, { user }) => {
      if (!user) return ApolloAccessError();
      const users: [UserPayload] = await UserModel.find({}).exec();
      return users;
    },
    getSingleUser: async (_, { uid }) => {
      const u_id = createBsonObjectId(uid);
      return await UserModel.findOne({ _id: u_id }).exec();
    },
    userNameExists: async (_, { user_name }) => {
      const matches = await UserModel.find({ userName: user_name }).exec();
      return matches.length > 0;
    },
  },
  Mutation: {
    registerUser: async (_, args: { input: AddUserInput }) => {
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
      const token = setToken({ u_id: savedUser._id });

      return { __typename: "AuthPayload", token };
    },
    login: async (_, { input: { user_name, password } }) => {
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
        const token = setToken({ u_id: _id });

        return {
          __typename: "AuthPayload",
          token,
        };
      }
    },
    logout: async (_, {}, { token, user }, info) => {
      try {
        const { u_id, iat, exp } = user;
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
        return false;
      }
    },
  },
  UserPayload: {
    hunts: async (parent: UserPayload) => {
      const _id = createBsonObjectId(parent._id);
      const hunts: [Hunt] = await HuntModel.find({
        created_by: _id,
      }).exec();
      return hunts;
    },
  },
};

export default userResolver;
