type Config = {
    ACCT_SID: string;
    AUTH_TOKEN: string;
    TWILIO_NUMBER: string;
    MONGO_URI: string;
    SESSION_SECRET: string;
    SASS_PATH: string;
    PORT: number;
};
declare const sanitizedConfig: Config;
export default sanitizedConfig;
