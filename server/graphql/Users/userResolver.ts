import { GraphQLError } from "graphql";
import { compareSync, hashSync } from "bcryptjs";
import UserModel from "../../models/users";
import HuntModel from "../../models/hunts";
import {
  AddUserInput,
  Hunt,
  Resolvers,
  FullUser,
  UserPayload,
} from "../../generated/graphql";
import { createBsonObjectId } from "../../utils/createBsonObjectId";
import { setTokens } from "../jwt";

const userResolver: Resolvers = {
  Query: {
    getAllUsers: async () => {
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
    createUser: async (_, args: { input: AddUserInput }) => {
      const { first_name, last_name, user_name, password } = args.input;
      let hashedPw = hashSync(password, 15);
      const u_id = createBsonObjectId();
      const user = new UserModel({
        _id: u_id,
        first_name,
        last_name,
        user_name,
        password: hashedPw,
      });
      await user.save();
      return await UserModel.findOne({ _id: u_id }).exec();
    },
    login: async (_, { user_name, password }) => {
      // try {
      const user: FullUser = await UserModel.findOne({
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
        const { _id: u_id, user_name: u_name } = user;
        return setTokens({ u_id, u_name });
      }
      // } catch(err){}
    },
    // logout: (parent, args, context, info) => {},
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
