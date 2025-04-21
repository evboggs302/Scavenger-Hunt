import { throwResolutionError } from "utils/apolloErrorHandlers";
import { twilioClient } from "utils/twilioClient";

export const deprovisionNumber = async (number: string) => {
  try {
    return await twilioClient.incomingPhoneNumbers(number).remove();
  } catch {
    return throwResolutionError({
      location: "deprovisionNumber",
      message: "No available Twilio numbers.",
    });
  }
};
