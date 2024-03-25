import { HttpResponse } from "msw";
import { LoginUserDocument } from "../../generated/graphql";
import { graphqlInterceptLink } from "../utils/graphqlInterceptLink";

export const loginMock = [
  graphqlInterceptLink.mutation(LoginUserDocument, () => {
    return HttpResponse.json({
      data: {
        login: {
          __typename: "AuthPayload" as const,
          token: "token-from-log-in-mutation",
        },
      },
    });
  }),
];
