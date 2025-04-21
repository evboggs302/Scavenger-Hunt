import config from "../../config";
import { throwResolutionError } from "utils/apolloErrorHandlers";
import { twilioClient } from "utils/twilioClient";

const { SERVER_URL_GQL } = config;

export const fetchNewNumber = async (hunt_id: string): Promise<string> => {
  try {
    const number = await twilioClient.availablePhoneNumbers("US").mobile.list({
      limit: 1,
      smsEnabled: true,
      mmsEnabled: true,
      voiceEnabled: false,
      excludeAllAddressRequired: true,
      excludeLocalAddressRequired: true,
      excludeForeignAddressRequired: true,
    });

    if (!number[0].phoneNumber) {
      throw new Error();
    }

    await twilioClient.incomingPhoneNumbers(number[0].phoneNumber).update({
      friendlyName: `huntID-${hunt_id}`,
      smsUrl: `${SERVER_URL_GQL}/twilio/sms`,
    });

    return number[0].phoneNumber;
  } catch {
    return throwResolutionError({
      location: "fetchNewNumber",
      message: "No available Twilio numbers.",
    });
  }
};
