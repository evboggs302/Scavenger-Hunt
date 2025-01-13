import { ServerOptions } from "graphql-ws";
import { TokenModel } from "../../models/token_storage";
import { AuthenticationError } from "../../utils/apolloErrorHandlers";
import { getUserFromToken } from "../../utils/jwt";
import { UserPayload } from "generated/graphql";

export type SubscriptionContext = {
  user: UserPayload;
  authToken: string;
};

export const createSubscriptionContext: ServerOptions["context"] = async (
  {
    connectionParams,
  }: {
    connectionParams: { authentication: string };
  }
  //   msg,
  //   args
): Promise<SubscriptionContext> => {
  if (!connectionParams?.authentication) {
    return AuthenticationError({
      message: "You are not authorized.",
      location: "ServerMiddleware",
    });
  } else {
    const authToken = connectionParams.authentication.replace("Bearer ", "");
    const tokenExists = await TokenModel.findOne({
      token: authToken,
    }).exec();
    const user = await getUserFromToken(authToken);
    if (!tokenExists || !user) {
      return AuthenticationError({
        message:
          "Expired or invalid token. If you have an account, please try logging back in.",
        location: "ServerMiddleware",
      });
    }
    return { user, authToken };
  }
};
