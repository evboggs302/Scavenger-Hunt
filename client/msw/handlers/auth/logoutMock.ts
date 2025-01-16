import { HttpResponse, graphql } from "msw";
import { LogoutUserDocument } from "@generated/graphql";

export const logoutMock = graphql.mutation(LogoutUserDocument, () => {
  return HttpResponse.json({
    data: {
      logout: true,
    },
  });
});
