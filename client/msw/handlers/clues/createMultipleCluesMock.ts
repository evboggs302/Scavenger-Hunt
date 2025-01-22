import { HttpResponse, graphql } from "msw";
import { CreateMultipleCluesDocument } from "@generated/graphql";
import { hexadecimalStr } from "@msw/utils/createHexadecimal";

const hunt_id = hexadecimalStr();

export const createMultipleCluesMock = graphql.mutation(
  CreateMultipleCluesDocument,
  async ({ variables: { input } }) => {
    return HttpResponse.json({
      data: {
        clues: input.cluesList
          .filter((clu) => !!clu)
          .map((clu, idx) => ({
            __typename: "CluePayload" as const,
            _id: hexadecimalStr(),
            hunt_id,
            order_number: idx + 1,
            description: clu,
          })),
      },
    });
  }
);
