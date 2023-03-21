import path from "path";
import * as dotenv from "dotenv";

type ENV = {
  ACCT_SID: string | undefined;
  AUTH_TOKEN: string | undefined;
  TWILIO_NUMBER: string | undefined;
  MONGO_URI: string | undefined;
  SESSION_SECRET: string | undefined;
  SASS_PATH: string | undefined;
  PORT: number | undefined;
};

type Config = {
  ACCT_SID: string;
  AUTH_TOKEN: string;
  TWILIO_NUMBER: string;
  MONGO_URI: string;
  SESSION_SECRET: string;
  SASS_PATH: string;
  PORT: number;
};

// Parsing the env file.
dotenv.config({ path: "../.env" });
// dotenv.config();

const getConfig = (): ENV => {
  return {
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    MONGO_URI: process.env.MONGO_URI,
    ACCT_SID: process.env.ACCT_SID,
    AUTH_TOKEN: process.env.AUTH_TOKEN,
    TWILIO_NUMBER: process.env.TWILIO_NUMBER,
    SESSION_SECRET: process.env.SESSION_SECRET,
    SASS_PATH: process.env.SASS_PATH,
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
