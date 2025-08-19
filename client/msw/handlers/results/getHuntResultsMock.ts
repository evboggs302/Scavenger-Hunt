import { HttpResponse, graphql } from "msw";
import { GetReusltsDocument } from "@generated/graphql";
import { mockHunt } from "@msw/utils/mockHunts";
import { generateAnalytics } from "@msw/utils/generateAnalytics";

export const getHuntResultsMock = graphql.query(GetReusltsDocument, () => {
  return HttpResponse.json({
    data: {
      results: {
        ...mockHunt,
        analytics: generateAnalytics(),
      },
    },
  });
});
