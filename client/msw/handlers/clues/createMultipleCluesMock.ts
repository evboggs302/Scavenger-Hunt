import { HttpResponse, graphql } from "msw";
import { CreateMultipleCluesDocument } from "@generated/graphql";
import { faker } from "@faker-js/faker";

const hunt_id = faker.string.hexadecimal();

export const createMultipleCluesMock = graphql.mutation(
  CreateMultipleCluesDocument,
  async ({ variables: { input } }) => {
    return HttpResponse.json({
      data: {
        clues: input.cluesList
          .filter((clu) => !!clu)
          .map((clu) => ({
            ...clu,
            __typename: "CluePayload" as const,
            _id: faker.string.hexadecimal(),
            order_number: clu?.orderNumber,
            hunt_id,
          })),
      },
    });
  }
);
