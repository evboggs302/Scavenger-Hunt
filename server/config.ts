import * as dotenv from "dotenv";
import { Secret } from "jsonwebtoken";

type ENV = {
  TWILIO_ACCT_SID: string | undefined;
  TWILIO_AUTH_TOKEN: string | undefined;
  TWILIO_NUMBER: string | undefined;
  MONGO_URI: string | undefined;
  SESSION_SECRET: string | undefined;
  SASS_PATH: string | undefined;
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
  TWILIO_NUMBER: string;
  MONGO_URI: string;
  SESSION_SECRET: string;
  SASS_PATH: string;
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
    TWILIO_NUMBER: process.env.TWILIO_NUMBER,
    SESSION_SECRET: process.env.SESSION_SECRET,
    SASS_PATH: process.env.SASS_PATH,
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
