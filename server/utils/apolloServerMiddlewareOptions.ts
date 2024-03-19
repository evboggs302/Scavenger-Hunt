import { BaseContext } from "@apollo/server";
import { getUserFromToken } from "./jwt";
import TokenStorageModel from "../models/token_storage";
import { ApolloAccessError } from "./apolloErrorHandlers";
import { ExpressMiddlewareOptions } from "@apollo/server/express4";

export const apolloServerMiddlewareOptions: ExpressMiddlewareOptions<BaseContext> =
  {
    context: async ({ req }) => {
      if (["RegisterUser", "LoginUser"].includes(req.body.operationName)) {
        return { req };
      } else if (!req.headers.authorization) {
        return ApolloAccessError("You are not authorized.");
      } else {
        const tokenHeader = req.headers.authorization;
        console.log(tokenHeader);
        const token = tokenHeader.replace("Bearer ", "");
        const tokenExists = await TokenStorageModel.findOne({
          token,
        }).exec();
        const user = await getUserFromToken(token);
        if (!tokenExists || !user) {
          return ApolloAccessError(
            "Expired or invalid token. If you have an account, please try logging back in."
          );
        }
        return { req, token, user };
      }
    },
  };
