import { HttpResponse, graphql } from "msw";
import { CreateSingleClueDocument } from "@generated/graphql";
import { generateClues } from "@msw/utils/generateClues";
import { hexadecimalStr } from "@msw/utils/createHexadecimal";

export const createSingleClueMock = graphql.mutation(
  CreateSingleClueDocument,
  async ({ variables: { input } }) => {
    const _id = hexadecimalStr();

    return HttpResponse.json({
      data: {
        clues: [
          ...generateClues(2),
          {
            __typename: "CluePayload" as const,
            _id,
            hunt_id: input.h_id,
            order_number: 3,
            description: input.description,
          },
        ],
      },
    });
  }
);
