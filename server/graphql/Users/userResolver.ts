import { hashSync } from "bcryptjs";
import UserModel from "../../models/users";
import HuntModel from "../../models/hunts";
import { AddUserInput, User, Hunt, Resolvers } from "../../generated/graphql";
import { BsonObjectId } from "../../utils/BsonObjectIdCreater";

const userResolver: Resolvers = {
  Query: {
    getAllUsers: async () => {
      const users: [User] = await UserModel.find({}).exec();
      return users;
    },
    getSingleUser: async (_, args: { uid: string }) => {
      const u_id = BsonObjectId(args.uid);
      return await UserModel.findOne({ _id: u_id }).exec();
    },
    // login: (parent, args, context, info) => {},
    // logout: (parent, args, context, info) => {},
    userNameExists: async (_, args: { userName: string }) => {
      const { userName } = args;
      const matches = await UserModel.find({ userName: userName }).exec();
      // context.existingUsers = matches;
      // console.log(context);
      return matches.length > 0;
    },
  },
  Mutation: {
    createUser: async (_, args: { input: AddUserInput }) => {
      const { first_name, last_name, user_name, password } = args.input;
      let hashedPw = hashSync(password, 15);
      const u_id = BsonObjectId();
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
  },
  User: {
    hunts: async (parent: User) => {
      const _id = BsonObjectId(parent._id);
      const hunts: [Hunt] = await HuntModel.find({
        created_by: _id,
      }).exec();
      return hunts;
    },
  },
};

export default userResolver;
