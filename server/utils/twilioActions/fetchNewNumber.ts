import config from "@/config";
import { twilioClient } from "@utils/twilioClient";
import { throwResolutionError } from "@utils/apolloErrorHandlers";

const { SERVER_TWILIO_WEBHOOK_URL } = config;

/**
 * @description
 * Fetch a new Twilio number for the hunt, then update the number with the hunt ID and the servers Twilio webhook URL.
 * @link https://www.twilio.com/docs/phone-numbers/api/availablephonenumber-mobile-resource
 * @link https://www.twilio.com/docs/phone-numbers/api/incomingphonenumber-resource#update-an-incomingphonenumber-resource
 */
export const fetchNewNumber = async (
  accountSid: string,
  hunt_id: string
): Promise<string> => {
  try {
    const number = await twilioClient.api
      .accounts(accountSid)
      .availablePhoneNumbers("US")
      .mobile.list({
        limit: 1,
        smsEnabled: true,
        mmsEnabled: true,
        voiceEnabled: false,
        excludeAllAddressRequired: true,
        excludeLocalAddressRequired: true,
        excludeForeignAddressRequired: true,
      });

    if (!number[0]) {
      throw new Error();
    }

    const phoneNumber = number[0].phoneNumber;
    await twilioClient.incomingPhoneNumbers(phoneNumber).update({
      friendlyName: `HuntID-${hunt_id}`,
      smsUrl: `${SERVER_TWILIO_WEBHOOK_URL}`,
    });

    return phoneNumber;
  } catch {
    return throwResolutionError({
      location: "fetchNewNumber",
      message: "No available phone numbers. Try again later.",
    });
  }
};
