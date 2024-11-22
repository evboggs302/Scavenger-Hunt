import { HttpResponse, graphql } from "msw";
import { RegisterUserDocument } from "@generated/graphql";

export const registerMock = graphql.mutation(
  RegisterUserDocument,
  ({ variables }) => {
    return HttpResponse.json({
      data: {
        registerUser: {
          __typename: "AuthPayload" as const,
          _id: "msw-id-string",
          token: "token-from-register-mutation",
        },
      },
    });
  }
);
