import twilio from "twilio";
import config from "../../config";
import { throwResolutionError } from "../apolloErrorHandlers";

const { TWILIO_ACCT_SID, TWILIO_AUTH_TOKEN } = config;

/**
 * @description
 * Calculates the Twilio account balance for a given subaccount.
 * @todo Add a percentage for profit margin.
 * @param subaccountSid - The SID of the Twilio subaccount.
 * @returns The TOTAL account balance of the Twilio subaccount.
 */
export const calculateTwilioSubAccountUsage = async (
  subaccountSid: string
): Promise<number> => {
  const client = twilio(TWILIO_ACCT_SID, TWILIO_AUTH_TOKEN, {
    accountSid: subaccountSid,
  });

  try {
    const { balance } = await client.api
      .accounts(subaccountSid)
      .balance.fetch();

    return parseFloat(balance);
  } catch (error) {
    return throwResolutionError({
      location: "calculateAccountBalance",
      message: "Error calculating account charges.",
      err: error,
    });
  }
};
