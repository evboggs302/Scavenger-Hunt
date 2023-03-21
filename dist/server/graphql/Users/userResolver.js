"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../../models/users");
// (parent, args, context, info) => {},
const userResolver = {
    Query: {
        getAllUsers: () => {
            return users_1.default.find({});
        },
        // getActiveUser: (parent, args, context, info) => {},
        // getSingleUser: (parent, args, context, info) => {},
        // login: (parent, args, context, info) => {},
        // logout: (parent, args, context, info) => {},
        userNameExists: async (parent, args, context, info) => {
            const { userName } = args;
            const matches = await users_1.default.find({ userName: userName }).exec();
            console.log(info);
            return matches.length > 0;
        },
    },
    // Mutation: {
    //   addUser: (parent, args, context, info) => {},
    //   removeHuntFromUser: (parent, args, context, info) => {},
    // },
};
exports.default = userResolver;
