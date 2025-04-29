import twilio from "twilio";
import config from "../../config";
import { throwResolutionError } from "../apolloErrorHandlers";

const { TWILIO_ACCT_SID, TWILIO_AUTH_TOKEN } = config;

export const calculatePhoneNumberCost = async (subaccountSid: string) => {
  const client = twilio(TWILIO_ACCT_SID, TWILIO_AUTH_TOKEN, {
    accountSid: subaccountSid,
  });

  try {
    // SMS usage
    const smsUsage = await Promise.all([
      client.usage.records.list({
        category: "sms",
      }),
      client.usage.records.list({
        category: "sms-messages-carrierfees",
      }),
    ]).then((results) =>
      results.flat().reduce((acc, record) => {
        return acc + record.price;
      }, 0)
    );

    // MMS usage
    const mmsUsage = await Promise.all([
      client.usage.records.list({
        category: "mms",
      }),
      client.usage.records.list({
        category: "mms-messages-carrierfees",
      }),
      client.usage.records.list({
        category: "mediastorage",
      }),
    ]).then((results) =>
      results.flat().reduce((acc, record) => {
        return acc + record.price;
      }, 0)
    );

    return smsUsage + mmsUsage;
  } catch (error) {
    return throwResolutionError({
      location: "calculatePhoneNumberCost",
      message: "Unable to calculate phone number cost.",
      err: error,
    });
  }
};
