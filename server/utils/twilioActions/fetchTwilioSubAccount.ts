import { twilioClient } from "../twilioClient";
import { throwResolutionError } from "../apolloErrorHandlers";
import { AccountInstance } from "twilio/lib/rest/api/v2010/account";

export const fetchTwilioSubAccount = async (
  subaccountSid: string
): Promise<AccountInstance> => {
  try {
    return await twilioClient.api.accounts(subaccountSid).fetch();
  } catch (err) {
    return throwResolutionError({
      location: "fetchTwilioSubAccount",
      message: "Unable to fetch Twilio sub account.",
      err,
    });
  }
};
