import { MutationResolvers } from "generated/graphql";
import { TokenModel } from "../../../models/token_storage";
import { throwServerError } from "../../../utils/apolloErrorHandlers";

export const logout: MutationResolvers["logout"] = async (
  _parent: unknown,
  _args,
  { token, user },
  { operation: { name } }
) => {
  try {
    await TokenModel.deleteOne({
      token,
      issuedToUser: user._id.toString(),
    });
    return true;
  } catch (err) {
    return throwServerError({
      err,
      message: "Unable to logout at this time.",
      location: name?.value,
    });
  }
};
