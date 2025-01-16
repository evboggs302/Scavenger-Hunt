import { HttpResponse, graphql } from "msw";
import { LoginUserDocument } from "@generated/graphql";
import { createMockToken } from "@msw/utils/createMockToken";
import { hexadecimalStr } from "@msw/utils/createHexadecimal";

export const loginMock = graphql.mutation(LoginUserDocument, async () => {
  const _id = hexadecimalStr();
  const token = await createMockToken();

  return HttpResponse.json({
    data: {
      login: {
        __typename: "AuthPayload" as const,
        _id,
        token,
      },
    },
  });
});
