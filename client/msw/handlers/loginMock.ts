import { HttpResponse, graphql } from "msw";
import { LoginUserDocument } from "@generated/graphql";

export const loginMock = graphql.mutation(LoginUserDocument, () => {
  return HttpResponse.json({
    data: {
      login: {
        __typename: "AuthPayload" as const,
        _id: "msw-id-string",
        token: "token-from-log-in-mutation",
      },
    },
  });
});
