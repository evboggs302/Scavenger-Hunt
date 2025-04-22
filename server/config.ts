import * as dotenv from "dotenv";
import { Secret } from "jsonwebtoken";

type ENV = {
  TWILIO_ACCT_SID: string | undefined;
  TWILIO_AUTH_TOKEN: string | undefined;
  MONGO_URI: string | undefined;
  SESSION_SECRET: string | undefined;
  CLIENT_URL: string | undefined;
  SERVER_URL_GQL: string | undefined;
  SERVER_URL_SUBSCRIPTION: string | undefined;
  SERVER_TWILIO_WEBHOOK_URL: string | undefined;
  PORT: number | undefined;
  JWT_SECRET: string | undefined;
  ACCESS_TOKEN_SECRET: string | undefined;
  REFRESH_TOKEN_SECRET: string | undefined;
  ACCESS_TOKEN_DURATION: string | undefined;
  REFRESH_TOKEN_DURATION: string | undefined;
};

type Config = {
  TWILIO_ACCT_SID: string;
  TWILIO_AUTH_TOKEN: string;
  MONGO_URI: string;
  SESSION_SECRET: string;
  SERVER_URL_GQL: string;
  SERVER_URL_SUBSCRIPTION: string;
  SERVER_TWILIO_WEBHOOK_URL: string;
  CLIENT_URL: string;
  PORT: number;
  JWT_SECRET: Secret;
  SERVER_URL: string;
  ACCESS_TOKEN_SECRET: Secret;
  REFRESH_TOKEN_SECRET: Secret;
  ACCESS_TOKEN_DURATION: string;
  REFRESH_TOKEN_DURATION: string;
};

// Parsing the env file.
dotenv.config({ path: "../.env" });

const getConfig = (): ENV => {
  return {
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    MONGO_URI: process.env.MONGO_URI,
    TWILIO_ACCT_SID: process.env.TWILIO_ACCT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    SESSION_SECRET: process.env.SESSION_SECRET,
    CLIENT_URL: process.env.CLIENT_URL,
    SERVER_URL_GQL: process.env.SERVER_URL_GQL,
    SERVER_URL_SUBSCRIPTION: process.env.SERVER_URL_SUBSCRIPTION,
    SERVER_TWILIO_WEBHOOK_URL: process.env.SERVER_TWILIO_WEBHOOK_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_DURATION: process.env.ACCESS_TOKEN_DURATION,
    REFRESH_TOKEN_DURATION: process.env.REFRESH_TOKEN_DURATION,
    ...process.env,
  };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();
const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
