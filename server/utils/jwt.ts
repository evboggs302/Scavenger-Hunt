import { sign, verify, JwtPayload } from "jsonwebtoken";
import TokenStorageModel from "../models/token_storage";
import config from "../config";
import parseDuration from "parse-duration";
import { GraphQLError } from "graphql";
import { Types } from "mongoose";

const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_DURATION } = config;

type SetTokenArgs = {
  u_id: string;
  // permissions: string[];
  // roles: string[];
};

export const createAndSaveToken = async (id: Types.ObjectId) => {
  try {
    const token = setToken({ u_id: `${id}` });
    const today = new Date();
    const expiresInMs = parseDuration(ACCESS_TOKEN_DURATION) as number;

    const newToken = new TokenStorageModel({
      token,
      issuedToUser: id,
      issuedAt: today,
      expireAt: new Date(Date.now() + expiresInMs),
    });
    await newToken.save();

    return token;
  } catch (err) {
    throw new GraphQLError("Unable to create token", {
      extensions: {
        code: "TOKEN ISSUE",
        http: { status: 404 },
        error: err,
      },
    });
  }
};

export const getUserFromToken = (token: string) => {
  try {
    const verifiedToken = verifyToken(token);
    return verifiedToken;
  } catch (error) {
    return null;
  }
};

export const setToken = ({ u_id }: SetTokenArgs) => {
  // if you want to include more than the user's id in the JWT then include it here
  const user = { u_id };
  const accessToken = sign(user, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_DURATION,
  });

  // console.log("accessToken: ", accessToken);
  return accessToken;
};

export const verifyToken = (token: string) => {
  try {
    const verifiedAccessToken = verify(token, ACCESS_TOKEN_SECRET);
    return verifiedAccessToken as JwtPayload;
  } catch (error) {
    // if (error instanceof Error && error.message !== "jwt expired") {
    //   console.error(`Access token error: ${error.message}`);
    // }
    return null;
  }
};
