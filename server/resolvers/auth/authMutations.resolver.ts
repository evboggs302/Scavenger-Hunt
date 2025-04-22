import { Resolvers } from "generated/graphql";
import { registerUser } from "./resolverFunctions/registerUser";
import { loginUser } from "./resolverFunctions/loginUser";
import { deleteUser } from "./resolverFunctions/deleteUser";
import { logout } from "./resolverFunctions/logout";

const userResolver: Resolvers = {
  Mutation: {
    registerUser,
    login: loginUser,
    deleteUser,
    logout,
  },
};

export default { ...userResolver };
