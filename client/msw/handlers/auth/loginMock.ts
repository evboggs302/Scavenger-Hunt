import { HttpResponse, graphql } from "msw";
import { LoginUserDocument } from "@generated/graphql";
import { faker } from "@faker-js/faker";
import { createMockToken } from "../../utils/createMockToken";

export const loginMock = graphql.mutation(LoginUserDocument, async () => {
  const _id = faker.string.hexadecimal({ length: 24 });
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
