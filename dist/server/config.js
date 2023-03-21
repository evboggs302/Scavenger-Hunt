"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
// Parsing the env file.
dotenv.config({ path: "../.env" });
// dotenv.config();
const getConfig = () => {
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
const getSanitzedConfig = (config) => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return config;
};
const config = getConfig();
const sanitizedConfig = getSanitzedConfig(config);
exports.default = sanitizedConfig;
