import { HttpResponse, graphql } from "msw";
import { GetUserFromTokenDocument } from "@generated/graphql";
import { v4 } from "uuid";

export const getUserFromTokenMock = graphql.query(
  GetUserFromTokenDocument,
  () => {
    return HttpResponse.json({
      data: {
        user: {
          __typename: "UserPayload" as const,
          _id: v4(),
          user_name: "vitey",
          first_name: "vite-man",
          last_name: "lastname",
        },
      },
    });
  }
);
