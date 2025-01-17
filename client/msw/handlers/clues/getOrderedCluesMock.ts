import { HttpResponse, graphql } from "msw";
import { GetOrderedCluesDocument } from "@generated/graphql";
import { mockHunt } from "@msw/utils/mockHunts";

export const getOrderedCluesMock = graphql.query(
  GetOrderedCluesDocument,
  () => {
    return HttpResponse.json({
      data: {
        clues: mockHunt.clues,
      },
    });
  }
);
