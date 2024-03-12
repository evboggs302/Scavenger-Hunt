import { BaseContext } from "@apollo/server";
import { getUserFromToken } from "./jwt";
import TokenStorageModel from "../models/token_storage";
import { ApolloAccessError } from "./apolloErrorHandlers";
import { ExpressMiddlewareOptions } from "@apollo/server/express4";
import { JwtPayload } from "jsonwebtoken";

export interface ServerContext extends BaseContext {
  // token?: string;
  // user?: JwtPayload | null;
}

export const apolloServerMiddlewareOptions: ExpressMiddlewareOptions<ServerContext> =
  {
    context: async ({ req }) => {
      if (["RegisterUser", "Login"].includes(req.body.operationName)) {
        return { req };
      } else if (!req.headers.authorization) {
        return ApolloAccessError("You are not nauthorized.");
      } else {
        const tokenHeader = req.headers.authorization;
        const token = tokenHeader.replace("Bearer ", "");
        const tokenExists = await TokenStorageModel.findOne({
          token: token,
        }).exec();
        if (!tokenExists) {
          return ApolloAccessError(
            "Expired or invalid token. If you have an account, please try logging back in."
          );
        }
        return { req, token, user: getUserFromToken(token) };
      }
    },
  };
