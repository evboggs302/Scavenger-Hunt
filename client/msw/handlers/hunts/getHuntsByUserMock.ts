import { HttpResponse, graphql } from "msw";
import { GetHuntsByUserIdDocument } from "@generated/graphql";
import { generateHunts } from "../../utils/generateHunts";

const hunts = generateHunts(3);

export const getHuntsBuyUserIdMock = graphql.query(
  GetHuntsByUserIdDocument,
  () => {
    return HttpResponse.json({
      data: {
        hunts,
      },
    });
  }
);
