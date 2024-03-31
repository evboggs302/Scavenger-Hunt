import { HttpResponse, graphql } from "msw";
import { RegisterUserDocument } from "../../src/generated/graphql";

export const registerMock = graphql.mutation(
  RegisterUserDocument,
  ({ variables }) => {
    return HttpResponse.json({
      data: {
        registerUser: {
          _id: "string-id",
          __typename: "AuthPayload" as const,
          user_name: variables.input.user_name,
          first_name: variables.input.first_name,
          last_name: variables.input.last_name,
          token: "register-token",
        },
      },
    });
  }
);
