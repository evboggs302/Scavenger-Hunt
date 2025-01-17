import { HttpResponse, graphql } from "msw";
import { GetHuntDocument } from "@generated/graphql";
import { mockHunt } from "@msw/utils/mockHunts";

export const getHuntMock = graphql.query(GetHuntDocument, () => {
  return HttpResponse.json({
    data: {
      hunt: mockHunt,
    },
  });
});
