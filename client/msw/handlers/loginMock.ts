import { HttpResponse, graphql } from "msw";
import { LoginUserDocument } from "@generated/graphql";
import { v4, v7 } from "uuid";

export const loginMock = graphql.mutation(LoginUserDocument, () => {
  return HttpResponse.json({
    data: {
      login: {
        __typename: "AuthPayload" as const,
        _id: v4(),
        token: v7(),
      },
    },
  });
});
