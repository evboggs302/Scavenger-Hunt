import { HttpResponse, graphql } from "msw";
import { UsernameExistsDocument } from "@generated/graphql";

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
