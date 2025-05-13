import { hashSync } from "bcryptjs";
import { MutationResolvers } from "generated/graphql";
import { createBsonObjectId } from "../../utils/transforms/createBsonObjectId";
import { UserModel } from "../../models/users";
import { throwResolutionError } from "../../utils/apolloErrorHandlers";
import { createAndSaveToken } from "../../utils/jwt";
import { createCustomerVendorAccounts } from "./createCustomerVendorAccounts";
import { deleteCustomerVendorAccounts } from "./deleteCustomerVendorAccounts";

export const registerUser: MutationResolvers["registerUser"] = async (
  _parent: unknown,
  { input: { first_name, last_name, user_name, email, password } },
  _ctxt,
  { operation: { name } }
) => {
  const hashedPw = hashSync(password, 15);
  const u_id = createBsonObjectId();
  const newUser = await UserModel.create({
    _id: u_id,
    email,
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

  await createCustomerVendorAccounts({
    fullName: `${first_name} ${last_name}`,
    email,
    userId: u_id.toString(),
  }).catch((err) => {
    return throwResolutionError({
      location: name?.value,
      message: "Unable to create customer vendor accounts.",
      err,
    });
  });

  const token = await createAndSaveToken(u_id);

  if (!token) {
    await deleteCustomerVendorAccounts(u_id);
    return throwResolutionError({
      location: name?.value,
      message: "Unable to find the newly saved user.",
    });
  }

  return token.transformWithTypename();
};
