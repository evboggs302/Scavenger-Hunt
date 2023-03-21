import { ApolloError } from "apollo-server-express";
import mongoose from "mongoose";
import { GraphQLResolveInfo } from "graphql";
import UserModel from "../../models/users";
import { UserResponsePayload } from "../../generated/graphql";

// (parent, args, context, info) => {},

const userResolver = {
  Query: {
    getAllUsers: (): [UserResponsePayload] => {
      return UserModel.find({});
    },
    // getActiveUser: (parent, args, context, info) => {},
    // getSingleUser: (parent, args, context, info) => {},
    // login: (parent, args, context, info) => {},
    // logout: (parent, args, context, info) => {},
    userNameExists: async (
      parent: undefined,
      args: { userName: string },
      context: {},
      info: GraphQLResolveInfo
    ) => {
      const { userName } = args;
      const matches = await UserModel.find({ userName: userName }).exec();
      console.log(info);
      return matches.length > 0;
    },
  },
  // Mutation: {
  //   addUser: (parent, args, context, info) => {},
  //   removeHuntFromUser: (parent, args, context, info) => {},
  // },
};

export default userResolver;
