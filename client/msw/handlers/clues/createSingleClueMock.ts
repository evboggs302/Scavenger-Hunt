import { HttpResponse, graphql } from "msw";
import { CreateSingleClueDocument } from "@generated/graphql";
import { faker } from "@faker-js/faker";
import { generateClues } from "../../utils/generateClues";

export const createSingleClueMock = graphql.mutation(
  CreateSingleClueDocument,
  async ({ variables: { input } }) => {
    const _id = faker.string.hexadecimal();

    return HttpResponse.json({
      data: {
        clues: [
          ...generateClues(2),
          {
            __typename: "CluePayload" as const,
            _id,
            hunt_id: input.h_id,
            order_number: input.clueItem.orderNumber,
            description: input.clueItem.description,
          },
        ],
      },
    });
  }
);
