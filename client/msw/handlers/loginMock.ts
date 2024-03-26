import { HttpResponse, graphql } from "msw";
import { LoginUserDocument } from "../../src/generated/graphql";

export const loginMock = graphql.mutation(LoginUserDocument, () => {
  return HttpResponse.json({
    data: {
      login: {
        __typename: "AuthPayload" as const,
        token: "token-from-log-in-mutation",
      },
    },
  });
});
