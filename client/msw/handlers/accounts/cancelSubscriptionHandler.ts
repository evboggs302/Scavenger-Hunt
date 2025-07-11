import { graphql, HttpResponse } from "msw";
import { CancelSubscriptionDocument } from "@generated/graphql";

export const cancelSubscriptionHandler = graphql.mutation(
  CancelSubscriptionDocument,
  () => {
    return HttpResponse.json({
      data: {
        cancelled: true,
      },
    });
  }
);
