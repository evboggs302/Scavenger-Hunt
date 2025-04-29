import { twilioClient } from "../twilioClient";
import { AccountModel } from "../../models/accounts";
import { throwResolutionError } from "../apolloErrorHandlers";

/**
 * @description
 * Deletes the Twilio sub account and remove the account from the database.
 * @param accountId - The ID of the twilio sub account to be deleted.
 * @returns A boolean indicating whether the deletion was successful.
 * @link https://www.twilio.com/docs/iam/api/account-resource#delete-an-account
 */
export const deleteTwilioSubAccount = async (accountId: string) => {
  try {
    await twilioClient.api
      .accounts(accountId)
      .update({
        status: "closed",
      })
      .catch((err) => {
        return throwResolutionError({
          location: "deleteTwilioSubAccount",
          message: "Unable to close Twilio sub account.",
          err,
        });
      });

    const { deletedCount } = await AccountModel.deleteOne({
      twilio_account_sid: accountId,
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
