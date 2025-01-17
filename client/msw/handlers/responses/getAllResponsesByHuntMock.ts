import { HttpResponse, graphql } from "msw";
import { GetAllResponsesByHuntIdDocument } from "@generated/graphql";
import { mockHunt } from "@msw/utils/mockHunts";

export const getAllResponsesByHuntMock = graphql.query(
  GetAllResponsesByHuntIdDocument,
  () => {
    const responses = mockHunt.clues
      .flatMap((item) => item.responses)
      .filter((res) => !!res);

    return HttpResponse.json({
      data: {
        result: {
          __typename: "ResponsesByHunt",
          count: responses?.length || 0,
          responses,
        },
      },
    });
  }
);
