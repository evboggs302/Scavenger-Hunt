import { Resolvers } from "generated/graphql";
import { registerUser } from "../registerUser";
import { loginUser } from "../loginUser";
import { deleteUser } from "../deleteUser";
import { logout } from "../logout";

const userResolver: Resolvers = {
  Mutation: {
    registerUser,
    login: loginUser,
    deleteUser,
    logout,
  },
};

export default { ...userResolver };
