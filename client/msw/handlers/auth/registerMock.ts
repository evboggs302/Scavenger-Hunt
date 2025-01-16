import { HttpResponse, graphql } from "msw";
import { RegisterUserDocument } from "@generated/graphql";
import { createMockToken } from "msw/utils/createMockToken";
import { hexadecimalStr } from "@msw/utils/createHexadecimal";

export const registerMock = graphql.mutation(
  RegisterUserDocument,
  async ({ variables }) => {
    const _id = hexadecimalStr();
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
