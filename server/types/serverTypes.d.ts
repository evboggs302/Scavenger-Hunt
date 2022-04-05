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
