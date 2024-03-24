import { graphql, HttpResponse } from "msw";
import { LoginUserDocument } from "../../generated/graphql";

export const loginMock = [
  graphql.mutation(LoginUserDocument, () => {
    return HttpResponse.json({
      data: {
        login: {
          token: "token-from-log-in-mutation",
        },
      },
    });
  }),
];
