import { HttpResponse, graphql } from "msw";
import { GetHuntDocument } from "@generated/graphql";
import dayjs from "dayjs";
import { v4 } from "uuid";

export const getHuntMock = graphql.query(GetHuntDocument, () => {
  return HttpResponse.json({
    data: {
      hunt: {
        __typename: "Hunt" as const,
        _id: v4(),
        name: `Mom's birthday hunt`,
        created_by: v4(),
        created_date: dayjs().toISOString(),
        start_date: dayjs().add(1, "day").toISOString(),
        end_date: dayjs().add(2, "days").toISOString(),
        marked_complete: false,
        is_active: false,
        recall_message: "Come on back now",
        teams: [],
      },
    },
  });
});
