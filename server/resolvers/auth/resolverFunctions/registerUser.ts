import { hashSync } from "bcryptjs";
import { MutationResolvers } from "generated/graphql";
import { createBsonObjectId } from "../../../utils/transforms/createBsonObjectId";
import { UserModel } from "../../../models/users";
import { TokenModel } from "../../../models/token_storage";
import { throwResolutionError } from "../../../utils/apolloErrorHandlers";
import { createAndSaveToken } from "../../../utils/jwt";
import { createTwilioSubAccount } from "../../../utils/twilioActions/createTwilioSubAccount";

export const registerUser: MutationResolvers["registerUser"] = async (
  _parent: unknown,
  { input: { first_name, last_name, user_name, password } },
  _ctxt,
  { operation: { name } }
) => {
  const hashedPw = hashSync(password, 15);
  const u_id = createBsonObjectId();
  const newUser = await UserModel.create({
    _id: u_id,
    first_name,
    last_name,
    user_name,
    hash: hashedPw,
  });

  if (!newUser) {
    return throwResolutionError({
      location: name?.value,
      message: "Unable to find the newly saved user.",
    });
  }

  await createTwilioSubAccount(newUser._id.toString());

  const token = await createAndSaveToken(u_id);
  const tkn = await TokenModel.findOne({ token });

  if (!tkn) {
    return throwResolutionError({
      location: name?.value,
      message: "Unable to find the newly saved user.",
    });
  }

  return tkn.transformWithTypename();
};
