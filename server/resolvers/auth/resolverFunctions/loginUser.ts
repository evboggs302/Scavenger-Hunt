import { compareSync } from "bcryptjs";
import { MutationResolvers } from "generated/graphql";
import { TokenModel } from "../../../models/token_storage";
import { UserModel } from "../../../models/users";
import {
  AuthenticationError,
  throwResolutionError,
} from "../../../utils/apolloErrorHandlers";
import { createAndSaveToken } from "../../../utils/jwt";

export const loginUser: MutationResolvers["login"] = async (
  _parent: unknown,
  { input: { user_name, password } },
  _ctxt,
  { operation: { name } }
) => {
  const user = await UserModel.getUserForLogin(user_name);
  if (!user) {
    return AuthenticationError({
      message: "Username does not exist.",
      location: name?.value,
    });
  } else if (!compareSync(password, user.hash)) {
    return AuthenticationError({
      message: "Incorrect password.",
      location: name?.value,
    });
  } else {
    if (!user.account) {
      return throwResolutionError({
        message: "User does not have an account.",
        location: name?.value,
      });
    }

    const token = await createAndSaveToken(user._id);
    const tkn = await TokenModel.findOne({ token });

    if (!tkn) {
      return throwResolutionError({
        message: "Unable to find the newly saved user.",
        location: name?.value,
      });
    }

    return tkn.transformWithTypename();
  }
};
