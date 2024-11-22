import { HttpResponse, graphql } from "msw";
import { GetHuntsByUserIdDocument } from "@generated/graphql";

const __typename = "Hunt" as const;

export const getHuntsBuyUserIdMock = graphql.query(
  GetHuntsByUserIdDocument,
  () => {
    return HttpResponse.json({
      data: {
        hunts: [
          {
            __typename,
            _id: "1234567891011",
            name: "Hunt-1",
            created_date: "2024-03-14T13:19:24.926Z",
            start_date: "2024-10-05T14:48:00.000Z",
            end_date: "2025-03-15T12:39:37.000Z",
            is_active: false,
            recall_message: "Hurry on back, now!",
            created_by: "string-id",
          },
          {
            __typename,
            _id: "24681012141618",
            name: "Hunt-2",
            created_date: "2024-03-21T18:29:10.814Z",
            start_date: "2024-10-05T14:48:00.000Z",
            end_date: "2024-10-08T14:48:00.000Z",
            is_active: false,
            recall_message: "You've completed your hunt.",
            created_by: "string-id",
          },
          {
            __typename,
            _id: "6604892580ee469ac78d9fb6",
            name: "Hunt-3",
            created_date: "2024-03-27T18:29:21.614Z",
            start_date: "2024-08-30T21:00:36.145Z",
            end_date: "2024-09-01T21:00:36.145Z",
            is_active: false,
            recall_message: "You've completed your hunt.",
            created_by: "string-id",
          },
        ],
      },
    });
  }
);
