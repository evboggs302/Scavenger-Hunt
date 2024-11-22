import { HttpResponse, graphql } from "msw";
import { GetUserFromTokenDocument } from "@generated/graphql";

export const getUserFromTokenMock = graphql.query(
  GetUserFromTokenDocument,
  () => {
    return HttpResponse.json({
      data: {
        user: {
          __typename: "BaseUserPayload" as const,
          _id: "string-id",
          user_name: "vitey",
          first_name: "vite-man",
          last_name: "lastname",
        },
      },
    });
  }
);
