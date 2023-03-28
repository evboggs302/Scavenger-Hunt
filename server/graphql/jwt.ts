import * as jwt from "jsonwebtoken";
import config from "../config";
import { Tokens } from "../generated/graphql";
import { GraphQLError } from "graphql";

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_DURATION,
  REFRESH_TOKEN_DURATION,
} = config;

const { sign, verify } = jwt;

type SetTokenArgs = {
  u_id: string;
  u_name: string;
  // permissions: string[];
  // roles: string[];
};

export const setTokens = ({ u_id, u_name }: SetTokenArgs): Tokens => {
  // if you want to include more than the user's id in the JWT then include it here
  const user = { u_id, u_name };
  const accessToken = sign(user, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_DURATION,
  });
  const refreshToken = sign(user, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_DURATION,
  });
  return { __typename: "Tokens", ...user, accessToken, refreshToken };
};

// the following two functions wrap verify() in a try/catch to muffle expired jwt errors
export const validateAccessToken = (token: string) => {
  try {
    return verify(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    if (error instanceof Error && error.message !== "jwt expired") {
      throw new GraphQLError(`Access token error: ${error.message}`, {
        extensions: {
          code: "ACCESS TOKEN ERROR",
          http: { status: 404 },
        },
      });
    }
  }
};

export const validateRefreshToken = (token: string) => {
  try {
    return verify(token, REFRESH_TOKEN_SECRET);
  } catch (error) {
    if (error instanceof Error && error.message !== "jwt expired") {
      throw new GraphQLError(`Refresh token error: ${error.message}`, {
        extensions: {
          code: "REFRESH TOKEN ERROR",
          http: { status: 404 },
        },
      });
    }
  }
};
