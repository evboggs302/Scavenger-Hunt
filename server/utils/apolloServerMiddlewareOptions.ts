import { BaseContext } from "@apollo/server";
import { getUserFromToken } from "./jwt";
import TokenStorageModel from "../models/token_storage";
import { AuthenticationError } from "./apolloErrorHandlers";
import { ExpressMiddlewareOptions } from "@apollo/server/express4";

export const apolloServerMiddlewareOptions: ExpressMiddlewareOptions<BaseContext> =
  {
    context: async ({ req }) => {
      if (["RegisterUser", "LoginUser"].includes(req.body.operationName)) {
        return { req };
      } else if (!req.headers.authorization) {
        return AuthenticationError({
          message: "You are not authorized.",
          location: "ServerMiddleware",
        });
      } else {
        const tokenHeader = req.headers.authorization;
        const token = tokenHeader.replace("Bearer ", "");
        const tokenExists = await TokenStorageModel.findOne({
          token,
        }).exec();
        const user = await getUserFromToken(token);
        if (!tokenExists || !user) {
          return AuthenticationError({
            message:
              "Expired or invalid token. If you have an account, please try logging back in.",
            location: "ServerMiddleware",
          });
        }
        return { req, token, user };
      }
    },
  };
