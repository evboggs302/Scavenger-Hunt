import { MutationResolvers } from "@generated/graphql";
import { throwResolutionError } from "@utils/apolloErrorHandlers";
import { createBsonObjectId } from "@utils/transforms/createBsonObjectId";
import { TokenModel } from "@models/token_storage";
import { UserModel } from "@models/users";
import { HuntModel } from "@models/hunts";
import { TeamModel } from "@models/teams";
import { ResponseModel } from "@models/responses";
import { ClueModel } from "@models/clues";
import { deleteCustomerVendorAccounts } from "./deleteCustomerVendorAccounts";

/**
 * @todo Confirm user doesn't have any outstanding bills before deleting
 */
export const deleteUser: MutationResolvers["deleteUser"] = async (
  _parent: unknown,
  _args,
  { user: { _id: user_id }, accounts },
  { operation: { name } }
) => {
  try {
    const _id = createBsonObjectId(user_id);

    // CONFIRM THERE ARE NO ACTIVE HUNTS
    const activeHunt = await HuntModel.findOne({
      created_by: _id,
      is_active: true,
    }).exec();

    if (activeHunt) {
      return throwResolutionError({
        message: "User has an active hunt.",
        location: name?.value,
      });
    }

    // CONFIRM NO OUTSTANDING INVOICES

    const allHuntIDsForUser = await HuntModel.find<{ _id: typeof _id }>(
      { created_by: _id },
      "_id"
    ).exec();

    const allTeamIDsForUser = await TeamModel.find<{ _id: typeof _id }>(
      { hunt_id: { $in: allHuntIDsForUser } },
      "_id"
    ).exec();

    // DELETE ALL RESPONSES ASSOCIATED WITH HUNTS ASSOCIATED WITH THE USER
    await ResponseModel.deleteMany({
      team_id: { $in: allTeamIDsForUser },
    }).exec();

    // DELETE ALL TEAMS ASSOCIATED TO HUNTS ASSOCIATED WITH THE USER
    await TeamModel.deleteMany({
      hunt_id: { $in: allHuntIDsForUser },
    }).exec();

    // DELETE ALL CLUES ASSOCIATED TO HUNTS ASSOCIATED WITH THE USER
    await ClueModel.deleteMany({
      hunt_id: { $in: allHuntIDsForUser },
    }).exec();

    // DELETE ALL HUNTS ASSOCIATED WITH THE USER
    await HuntModel.deleteMany({
      created_by: _id,
    }).exec();

    // DELETE ALL TOKENS ASSOCIATED WITH THE USER
    await TokenModel.deleteMany({ issuedToUser: _id }).exec();

    // DELETE THE ACCOUNTS ASSOCIATED WITH THE USER
    await deleteCustomerVendorAccounts(accounts);

    // DELETE THE USER
    const { deletedCount } = await UserModel.deleteOne({ _id }).exec();

    return deletedCount === 1;
  } catch (err) {
    return throwResolutionError({
      message: "Unable to delete user",
      location: name?.value,
      err,
    });
  }
};
