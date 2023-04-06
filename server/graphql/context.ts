import { StandaloneServerContextFunctionArgument } from "@apollo/server/dist/esm/standalone";
import UserModel from "../models/users";
import { setTokens, validateAccessToken, validateRefreshToken } from "./jwt";

const context = async ({
  req,
  res,
}: StandaloneServerContextFunctionArgument) => {
  // let accessToken = req.headers["x-access-token"]?.replace(/^null$/, "");
  // let refreshToken = req.headers["x-refresh-token"]?.replace(/^null$/, "");
  // let id: string | null;

  // if (accessToken) {
  //   const decodedAccessToken = validateAccessToken(accessToken);
  //   id = decodedAccessToken?.u_id;
  // }

  // if (!id && refreshToken) {
  //   // access token may have expired so check the refresh token
  //   const tokenUser = validateRefreshToken(refreshToken)?.user;
  //   if (tokenUser) {
  //     /* refresh the tokens and make them available through headers to the client
  //      * this enables the client to transparently obtain fresh tokens without a separate GraphQL query */
  //     id = tokenUser.id;
  //     ({ accessToken, refreshToken } = setTokens(tokenUser));
  //     res.set("x-access-token", accessToken);
  //     res.set("x-refresh-token", refreshToken);
  //   }
  // } else
  //   console.info(
  //     `Invalid/expired access token presented but refreshToken null or missing!`
  //   );
  // /* If we have an id find, the user and add it to the context for easy access in resolvers
  //  * This will includes *all* the user fields however these won't go
  //  * back to the client unless requested via a graphql query */
  // const user = id ? await UserModel.findOne({ _id: id }) : null;
  return {
    req,
    res,
    // user
  };
};

export default context;
