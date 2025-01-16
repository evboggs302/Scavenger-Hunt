import { HttpResponse, graphql } from "msw";
import { RegisterUserDocument } from "@generated/graphql";
import { faker } from "@faker-js/faker";
import { createMockToken } from "msw/utils/createMockToken";

export const registerMock = graphql.mutation(
  RegisterUserDocument,
  async ({ variables }) => {
    const _id = faker.string.hexadecimal({ length: 24 });
    const token = await createMockToken();

    return HttpResponse.json({
      data: {
        registerUser: {
          __typename: "AuthPayload" as const,
          _id,
          token,
        },
      },
    });
  }
);
