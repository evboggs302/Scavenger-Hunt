import { HttpResponse } from "msw";
import { GetUserFromTokenDocument } from "../../generated/graphql";
import { graphqlInterceptLink } from "../utils/graphqlInterceptLink";

export const getUserFromTokenMock = [
  graphqlInterceptLink.query("GetUserFromToken", () => {
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
  }),
];
