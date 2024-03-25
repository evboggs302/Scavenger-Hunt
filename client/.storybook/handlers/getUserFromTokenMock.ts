import { HttpResponse, graphql } from "msw";
import { GetUserFromTokenDocument } from "../../src/generated/graphql";

export const getUserFromTokenMock = graphql.query(
  GetUserFromTokenDocument,
  (props) => {
    // console.log(props);
    return HttpResponse.json({
      data: {
        getUserFromToken: {
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
