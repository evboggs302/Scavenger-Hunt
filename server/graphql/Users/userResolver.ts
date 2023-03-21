import { ApolloError } from "apollo-server-express";
import mongoose from "mongoose";
import UserModel from "../../models/users";

// (parent, args, context, info) => {},

const userResolver = {
  Query: {
    getAllUsers: () => {
      return UserModel.find({});
    },
    // getActiveUser: (parent, args, context, info) => {},
    //   getSingleUser: (parent, args, context, info) => {},
    //   login: (parent, args, context, info) => {},
    //   logout: (parent, args, context, info) => {},
    //   userNameValidation: (parent, args, context, info) => {},
  },
  // Mutation: {
  //   addUser: (parent, args, context, info) => {},
  //   removeHuntFromUser: (parent, args, context, info) => {},
  // },
};

export default userResolver;
