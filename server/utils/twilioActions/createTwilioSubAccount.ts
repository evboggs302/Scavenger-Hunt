import { throwResolutionError } from "../apolloErrorHandlers";
import { twilioClient } from "../twilioClient";
import { deleteTwilioSubAccount } from "./deleteTwilioSubAccount";
import { AccountInstance } from "twilio/lib/rest/api/v2010/account";

/**
 * @description
 * Creates a Twilio sub account for the user and saves the account information in the database.
 * @param accountId - The ID of the user for whom the Twilio sub account is to be created.
 * @link https://www.twilio.com/docs/iam/api/subaccounts#creating-subaccounts
 */
export const createTwilioSubAccount = async (accountId: string) => {
  let account: AccountInstance | null = null;
  try {
    account = await twilioClient.api.accounts.create({
      friendlyName: `AccountID-${accountId}`,
    });

    if (!account) {
      throw new Error("Unable to create Twilio sub account.");
    }

    return {
      account_sid: account.sid,
      friendly_name: account.friendlyName,
    };
  } catch (err) {
    if (account) {
      await deleteTwilioSubAccount(account.sid);
    }
    return throwResolutionError({
      location: "createTwilioSubAccount",
      message: "Unable to create a Twilio sub account.",
      err,
    });
  }
};
