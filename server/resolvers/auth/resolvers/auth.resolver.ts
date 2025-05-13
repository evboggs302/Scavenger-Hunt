import { Resolvers } from "generated/graphql";
import { registerUser } from "../registerUser";
import { loginUser } from "../loginUser";
import { deleteUser } from "../deleteUser";
import { logout } from "../logout";
import { UserModel } from "../../../models/users";

const resolver: Resolvers = {
  Mutation: {
    registerUser,
    login: loginUser,
    deleteUser,
    logout,
  },
  Query: {
    userNameExists: async (_parent: unknown, { user_name }) => {
      const matches = await UserModel.findUsername(user_name);
      return matches.length > 0;
    },
    emailExists: async (_parent: unknown, { email }) => {
      const matches = await UserModel.findEmail(email);
      return matches.length > 0;
    },
  },
};

export default { ...resolver };
