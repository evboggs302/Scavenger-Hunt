import config from "../config";
import UserModel from "../models/users";
import TokenStorageModel from "../models/token_storage";
import { Types } from "mongoose";
import { GraphQLError } from "graphql";
import parseDuration from "parse-duration";
import { sign, verify } from "jsonwebtoken";
import { BaseUserPayload } from "../generated/graphql";
import { NotFoundError } from "./apolloErrorHandlers";

const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_DURATION } = config;

interface SetTokenArgs {
  u_id: string;
}

export const createAndSaveToken = async (id: Types.ObjectId) => {
  try {
    const token = setToken({ u_id: id.toString() });
    const today = new Date();
    const expiresInMs = parseDuration("2d") as number;

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

export const getUserFromToken = async (
  token: string
): Promise<BaseUserPayload | null> => {
  // authenticate token via decryption
  const verifiedToken = verifyToken(token);

  // the user the token is assigned to
  const storedToken = await TokenStorageModel.findOne({ token })
    .select({ issuedToUser: 1 })
    .exec();

  if (verifiedToken && storedToken?.issuedToUser) {
    const user = await UserModel.findOne({
      _id: storedToken?.issuedToUser,
    })
      .select({ hash: 0 })
      .exec();

    if (!user) {
      return await NotFoundError(
        "Unable to find the user associated with that token."
      );
    }

    return user.toObject();
  }
  return null;
};

export const setToken = ({ u_id }: SetTokenArgs) => {
  // if you want to include more than the user's id in the JWT then include it here
  const user = { u_id };
  const accessToken = sign(user, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_DURATION,
  });

  return accessToken;
};

export const verifyToken = (token: string) => {
  try {
    return verify(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    // if (error instanceof Error && error.message !== "jwt expired") {
    //   console.error(`Access token error: ${error.message}`);
    // }
    return null;
  }
};
