import { HttpResponse, graphql } from "msw";
import { GetOrderedCluesDocument } from "@generated/graphql";
import { generateClues } from "../../utils/generateClues";

const clues = generateClues(15);

export const getOrderedCluesMock = graphql.query(
  GetOrderedCluesDocument,
  () => {
    return HttpResponse.json({
      data: {
        clues,
      },
    });
  }
);
