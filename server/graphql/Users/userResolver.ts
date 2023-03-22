import { hashSync } from "bcryptjs";
import { GraphQLResolveInfo } from "graphql";
import UserModel from "../../models/users";
import { AddUserInput, User } from "../../generated/graphql";
import { ContextObj } from "@gql/contextObject";

// (parent, args, context, info) => {},

const userResolver = {
  Query: {
    getAllUsers: (): [User] => {
      return UserModel.find({});
    },
    // getSingleUser: (parent, args, context, info) => {},
    // login: (parent, args, context, info) => {},
    // logout: (parent, args, context, info) => {},
    userNameExists: async (
      parent: undefined,
      args: { userName: string },
      context: ContextObj,
      info: GraphQLResolveInfo
    ) => {
      const { userName } = args;
      const matches = await UserModel.find({ userName: userName }).exec();
      context.existingUsers = matches;
      console.log(context);
      return matches.length > 0;
    },
  },
  Mutation: {
    addUser: async (
      parent: undefined,
      args: { input: AddUserInput },
      context: {},
      info: GraphQLResolveInfo
    ) => {
      const { firstName, lastName, userName, password } = args.input;
      let hashedPw = hashSync(password, 15);
      return await UserModel.create({
        userName: userName,
        password: hashedPw,
        firstName: firstName,
        lastName: lastName,
        hunts: [],
      });
    },
    // removeHuntFromUser: (parent, args, context, info) => {},
  },
};

export default userResolver;
