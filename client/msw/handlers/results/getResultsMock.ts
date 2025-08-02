import { HttpResponse, graphql } from "msw";
import { GetReusltsDocument } from "@generated/graphql";

export const getResultsMock = graphql.query(GetReusltsDocument, () => {
  return HttpResponse.json({
    data: {
      results: {
        __typename: "Results",
        avg_response_time: 120_000,
        rejection_ratio: 3.5,
      },
    },
  });
});
