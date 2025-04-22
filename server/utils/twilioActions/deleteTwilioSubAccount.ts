import { twilioClient } from "../../utils/twilioClient";
import { AccountModel } from "../../models/accounts";
import { throwResolutionError } from "../../utils/apolloErrorHandlers";

/**
 * @description
 * Deletes the Twilio sub account and remove the account from the database.
 * @param userId - The ID of the user whose Twilio sub account is to be deleted.
 * @returns A boolean indicating whether the deletion was successful.
 * @link https://www.twilio.com/docs/iam/api/account-resource#delete-an-account
 */
export const deleteTwilioSubAccount = async (userId: string) => {
  try {
    const account = await AccountModel.findOne({
      user: userId,
    }).exec();

    if (!account) {
      return throwResolutionError({
        location: "deleteTwilioSubAccount",
        message: "Unable to find Twilio sub account.",
      });
    }

    await twilioClient.api.accounts(account.account_sid).update({
      status: "closed",
    });

    const { deletedCount } = await AccountModel.deleteOne({
      user: userId,
    }).exec();

    return deletedCount === 1;
  } catch (err) {
    return throwResolutionError({
      location: "deleteTwilioSubAccount",
      message: "Unable to delete Twilio sub account.",
      err,
    });
  }
};
