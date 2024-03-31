import { HttpResponse, graphql } from "msw";
import { UsernameExistsDocument } from "../../src/generated/graphql";

export const usernameExistsMock = graphql.query(
  UsernameExistsDocument,
  ({ variables }) => {
    return HttpResponse.json({
      data: {
        userNameExists: variables.username === "story",
      },
    });
  }
);
