import { HttpResponse, graphql } from "msw";
import { GetResponseCountByHuntIdDocument } from "@generated/graphql";

export const getResponseCountMock = graphql.query(
  GetResponseCountByHuntIdDocument,
  () => {
    return HttpResponse.json({
      data: {
        result: {
          __typename: "ResponsesByHunt" as const,
          count: 15,
        },
      },
    });
  }
);
