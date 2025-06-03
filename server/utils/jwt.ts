import config from "@/config";
import { UserModel } from "@models/users";
import { TokenModel } from "@models/token_storage";
import { Types } from "mongoose";
import { GraphQLError } from "graphql";
import parseDuration from "parse-duration";
import { sign, verify } from "jsonwebtoken";
import { UserPayload } from "@generated/graphql";
import { throwResolutionError } from "./apolloErrorHandlers";

const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_DURATION } = config;

interface SetTokenArgs {
  u_id: string;
}

/**
 * @description
 * Creates a token and saves it to the database.
 * @param user_id - The ID of the user.
 */
export const createAndSaveToken = async (user_id: Types.ObjectId) => {
  try {
    const token = setToken({
      u_id: user_id.toString(),
    });
    const today = new Date();
    const expiresInMs = parseDuration("2d") as number;

    return await TokenModel.create({
      token,
      issuedToUser: user_id,
      issuedAt: today,
      expireAt: new Date(Date.now() + expiresInMs),
    });
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
): Promise<UserPayload | null> => {
  // authenticate token via decryption
  const verifiedToken = verifyToken(token);

  // the user the token is assigned to
  const storedToken = await TokenModel.findOne({ token })
    .select({ issuedToUser: 1 })
    .exec();

  if (verifiedToken && storedToken?.issuedToUser) {
    const user = await UserModel.findOne({
      _id: storedToken.issuedToUser,
    })
      .select({ hash: 0 })
      .exec();

    if (!user) {
      return throwResolutionError({
        message: "Unable to find a user associated with that auth token.",
        location: "getUserFromToken",
      });
    }

    return user.transformWithoutHash();
  }
  return null;
};

export const setToken = (userObj: SetTokenArgs) => {
  // if you want to include more than the user's id in the JWT then include it here
  const accessToken = sign(userObj, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_DURATION,
  });

  return accessToken;
};

export const verifyToken = (token: string) => {
  try {
    return verify(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    if (error instanceof Error && error.message !== "jwt expired") {
      return throwResolutionError({
        message: "Unable to find a user associated with that auth token.",
        location: "verifyToken",
      });
    }
    return null;
  }
};
