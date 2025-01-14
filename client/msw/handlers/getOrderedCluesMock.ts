import { HttpResponse, graphql } from "msw";
import { GetOrderedCluesDocument } from "@generated/graphql";
import { v4 } from "uuid";

export const getOrderedCluesMock = graphql.query(
  GetOrderedCluesDocument,
  () => {
    return HttpResponse.json({
      data: {
        clues: [
          {
            __typename: "CluePayload" as const,
            _id: v4(),
            hunt_id: v4(),
            description: `Who is mom's favorite?`,
            order_number: 1,
          },
          {
            __typename: "CluePayload" as const,
            _id: v4(),
            hunt_id: v4(),
            description: `Where is mom's favorite place to eat?`,
            order_number: 2,
          },
        ],
      },
    });
  }
);
