import { StandaloneServerContextFunctionArgument } from "@apollo/server/dist/esm/standalone";
import { getUserFromToken } from "./jwt";
import TokenStorageModel from "../models/token_storage";
import { ApolloAccessError } from "./errors";

export const context = async ({
  req,
}: StandaloneServerContextFunctionArgument) => {
  const tokenHeader = req.headers.authorization || "";
  const token = tokenHeader.replace("Bearer ", "");
  const tokenExists = await TokenStorageModel.findOne({
    token: token,
  }).exec();
  if (tokenExists) {
    return ApolloAccessError("Expired or invalid token.");
  } else {
    return { req, token, user: getUserFromToken(token) };
  }
};
