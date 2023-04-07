import { sign, verify, JwtPayload } from "jsonwebtoken";
import config from "../config";

const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_DURATION } = config;

type SetTokenArgs = {
  u_id: string;
  // permissions: string[];
  // roles: string[];
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
