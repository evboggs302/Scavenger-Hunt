import { graphql, HttpResponse } from "msw";
import { FetchAccountTransactionsDocument } from "@generated/graphql";

export const fetchAccountTransationsHandler = graphql.query(
  FetchAccountTransactionsDocument,
  () => {
    return HttpResponse.json({
      data: {
        subscription: {
          __typename: "CustomerSubscription" as const,
          id: "sub_1234567890",
          description: "",
          priceId: "",
          amount: 2000,
          status: "active",
        },
        charges: [
          {
            __typename: "StripeCharge" as const,
            id: "charge_1234567890",
            date: 1679090539,
            status: "",
            amount: 3,
            description: "",
            paymentIntent: "",
            paymentCard: {
              __typename: "PaymentCard" as const,
              brand: "visa",
              last4: "7878",
            },
          },
        ],
      },
    });
  }
);
