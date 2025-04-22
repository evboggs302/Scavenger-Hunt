import { throwResolutionError } from "../apolloErrorHandlers";
import { twilioClient } from "../twilioClient";
import { AccountModel } from "../../models/accounts";
import { createBsonObjectId } from "../../utils/transforms/createBsonObjectId";
import { UserModel } from "../../models/users";
import { deleteTwilioSubAccount } from "./deleteTwilioSubAccount";
import { AccountInstance } from "twilio/lib/rest/api/v2010/account";

/**
 * @link https://www.twilio.com/docs/iam/api/subaccounts#creating-subaccounts
 */
export const createTwilioSubAccount = async (userId: string) => {
  let account: AccountInstance | null = null;
  try {
    const user_id = createBsonObjectId(userId);
    account = await twilioClient.api.accounts.create({
      friendlyName: `UserID-${userId}`,
    });

    if (!account) {
      throw new Error("Unable to create Twilio sub account.");
    }

    const acct_id = createBsonObjectId();
    const newAcct = await AccountModel.create({
      _id: acct_id,
      user: user_id,
      account_sid: account.sid,
    }).catch((err) => {
      throw new Error(`Unable to save account info: ${err}`);
    });

    await UserModel.updateOne({ _id: user_id }, { account: acct_id })
      .exec()
      .catch((err) => {
        throw new Error(`Unable to update user with account info: ${err}`);
      });

    return newAcct;
  } catch {
    if (account) {
      await deleteTwilioSubAccount(account.sid);
    }
    return throwResolutionError({
      location: "createTwilioSubAccount",
      message: "Unable to create a Twilio sub account. 3",
    });
  }
};
