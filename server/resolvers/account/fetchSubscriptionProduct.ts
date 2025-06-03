import { QueryResolvers } from "@generated/graphql";
import { fetchStripeSubscriptionProduct } from "@utils/stripeActions/subscriptions/fetchStripeSubscriptionProduct";
import { throwResolutionError } from "@utils/apolloErrorHandlers";

export const fetchSubscriptionProduct: QueryResolvers["fetchSubscriptionProduct"] =
  async (_parent: unknown, _args, _ctxt, { operation: { name } }) => {
    try {
      const { id, description, default_price } =
        await fetchStripeSubscriptionProduct();

      if (!default_price.unit_amount) {
        throw new Error("No price for subscription");
      }

      return {
        __typename: "SubscriptionProduct",
        id,
        description,
        priceId: default_price.id,
        amount: default_price.unit_amount,
      };
    } catch (err) {
      return throwResolutionError({
        location: name?.value,
        message: "Unable to locate subscription product.",
        err,
      });
    }
  };
