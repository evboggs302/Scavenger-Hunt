import { throwResolutionError } from "@utils/apolloErrorHandlers";
import { twilioClient } from "@utils/twilioClient";

/**
 * @description
 * Deprovision a Twilio phone number when Hunt is marked complete.
 * @link https://www.twilio.com/docs/phone-numbers/api/incomingphonenumber-resource#delete-an-incomingphonenumber-resource
 */
export const deprovisionNumber = async (number: string) => {
  try {
    return await twilioClient.incomingPhoneNumbers(number).remove();
  } catch (err) {
    return throwResolutionError({
      location: "deprovisionNumber",
      message: "Not able to deprovision the phone number.",
      err,
    });
  }
};
