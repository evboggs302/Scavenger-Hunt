import { getUserFromToken } from "../jwt";
import { TokenModel } from "../../models/token_storage";
import { AuthenticationError } from "../apolloErrorHandlers";

import type { ExpressMiddlewareOptions } from "@apollo/server/express4";
import type { ApolloServerContext } from "../../@types/ApolloServerContextType";
import type { UserPayload } from "generated/graphql";
import type { AccountDocument } from "../../models/accounts";
import { createBsonObjectId } from "../../utils/transforms/createBsonObjectId";
import { AccountModel } from "../../models/accounts";

export const apolloServerMiddlewareOptions: ExpressMiddlewareOptions<ApolloServerContext> =
  {
    context: async ({ req }) => {
      if (
        ["RegisterUser", "UsernameExists", "LoginUser", "EmailExists"].includes(
          req.body.operationName
        )
      ) {
        return {
          req,
          token: "",
          user: {} as UserPayload,
          accounts: {} as AccountDocument,
        };
      } else if (!req.headers.authorization) {
        return AuthenticationError({
          message: "You are not authorized.",
          location: "ServerMiddleware",
        });
      } else {
        const tokenHeader = req.headers.authorization;
        const token = tokenHeader.replace("Bearer ", "");
        const tokenExists = await TokenModel.findOne({
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

        const acct_id = createBsonObjectId(user.account);
        const accounts = await AccountModel.findById(acct_id);

        if (!accounts) {
          return AuthenticationError({
            message:
              "There was a problem locating your account information. Please reach out to the sites admin.",
            location: "ServerMiddleware",
          });
        }

        return { req, token, user, accounts };
      }
    },
  };
