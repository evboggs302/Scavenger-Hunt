import { BaseContext } from "@apollo/server";
import { getUserFromToken } from "./jwt";
import TokenStorageModel from "../models/token_storage";
import { ApolloAccessError } from "./apolloErrorHandlers";
import {
  ExpressMiddlewareOptions,
} from "@apollo/server/express4";
import { JwtPayload } from "jsonwebtoken";

export interface ServerContext extends BaseContext {
  token?: string;
  user?: JwtPayload | null;
}

export const apolloServerMiddlewareOptions: ExpressMiddlewareOptions<ServerContext> = {
  context: async ({ req }) => {
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
  },
};
