import { HttpResponse, graphql } from "msw";
import { GetHuntsByUserIdDocument } from "@generated/graphql";
import { mockHuntsArr } from "@msw/utils/mockHunts";

export const getHuntsBuyUserIdMock = graphql.query(
  GetHuntsByUserIdDocument,
  () => {
    return HttpResponse.json({
      data: {
        hunts: mockHuntsArr,
      },
    });
  }
);
