import twilio from "twilio";
import config from "../config";

const { TWILIO_ACCT_SID, TWILIO_AUTH_TOKEN } = config;
export const twilioClient = twilio(TWILIO_ACCT_SID, TWILIO_AUTH_TOKEN);
