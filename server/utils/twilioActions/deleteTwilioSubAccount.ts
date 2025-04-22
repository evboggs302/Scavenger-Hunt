import { twilioClient } from "../../utils/twilioClient";
import { AccountModel } from "../../models/accounts";
import { throwResolutionError } from "../../utils/apolloErrorHandlers";

/**
 * @description
 * Deletes the Twilio sub account and remove the account from the database.
 * @link https://www.twilio.com/docs/iam/api/account-resource#delete-an-account
 */
export const deleteTwilioSubAccount = async (account_sid: string) => {
  try {
    await twilioClient.api.accounts(account_sid).update({
      status: "closed",
    });

    const { deletedCount } = await AccountModel.deleteOne({
      account_sid,
    }).exec();

    return deletedCount === 1;
  } catch {
    return throwResolutionError({
      location: "deleteTwilioSubAccount",
      message: "Unable to delete Twilio sub account.",
    });
  }
};
