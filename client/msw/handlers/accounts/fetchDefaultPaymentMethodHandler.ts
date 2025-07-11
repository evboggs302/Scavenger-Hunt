import { FetchDefaultPaymentMethodDocument } from "@generated/graphql";
import { graphql, HttpResponse } from "msw";

export const fetchDefaultPaymentMethodHandler = graphql.query(
  FetchDefaultPaymentMethodDocument,
  () => {
    return HttpResponse.json({
      data: {
        defaultPaymentMethod: {
          __typename: "PaymentMethod" as const,
          id: "pm_1234567890",
          brand: "Visa",
          last4: "4242",
        },
      },
    });
  }
);
