import { HttpResponse, graphql } from "msw";
import { RegisterUserDocument } from "@generated/graphql";
import { v4, v7 } from "uuid";

export const registerMock = graphql.mutation(
  RegisterUserDocument,
  ({ variables }) => {
    return HttpResponse.json({
      data: {
        registerUser: {
          __typename: "AuthPayload" as const,
          _id: v4(),
          token: v7(),
        },
      },
    });
  }
);
