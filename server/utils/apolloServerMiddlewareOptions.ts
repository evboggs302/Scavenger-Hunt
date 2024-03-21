import { BaseContext } from "@apollo/server";
import { getUserFromToken } from "./jwt";
import TokenStorageModel from "../models/token_storage";
import { ExpressMiddlewareOptions } from "@apollo/server/express4";
import { AuthError } from "./apolloErrorHandlers";

export const apolloServerMiddlewareOptions: ExpressMiddlewareOptions<BaseContext> =
  {
    context: async ({ req }) => {
      if (["RegisterUser", "LoginUser"].includes(req.body.operationName)) {
        return { req };
      } else if (!req.headers.authorization) {
        return await AuthError("You are not authorized.");
      } else {
        const tokenHeader = req.headers.authorization;
        const token = tokenHeader.replace("Bearer ", "");
        const tokenExists = await TokenStorageModel.findOne({
          token,
        }).exec();
        const user = await getUserFromToken(token);
        if (!tokenExists || !user) {
          return await AuthError(
            "Expired or invalid token. If you have an account, please try logging back in."
          );
        }
        return { req, token, user };
      }
    },
  };
