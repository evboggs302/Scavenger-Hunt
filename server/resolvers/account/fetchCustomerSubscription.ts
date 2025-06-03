import { QueryResolvers } from "@generated/graphql";
import { fetchStripeSubscription } from "@utils/stripeActions/subscriptions/fetchStripeSubscription";
import { throwResolutionError } from "@utils/apolloErrorHandlers";
import { fetchStripeSubscriptionPriceObject } from "@utils/stripeActions/subscriptions/fetchStripeSubscriptionPriceObject";

export const fetchCustomerSubscription: QueryResolvers["fetchCustomerSubscription"] =
  async (_parent: unknown, _args, { accounts }, { operation: { name } }) => {
    try {
      const sub = await fetchStripeSubscription(accounts.stripe_customer_id);

      const subProductId =
        typeof sub.items.data[0].price.product === "string"
          ? sub.items.data[0].price.product
          : sub.items.data[0].price.product.id;

      const { unit_amount, product } =
        await fetchStripeSubscriptionPriceObject();

      const priceProductId = typeof product === "string" ? product : product.id;

      if (subProductId !== priceProductId) {
        throw new Error("Mismatched products.");
      }

      if (!unit_amount) {
        throw new Error("Subscription prices is missing");
      }

      return {
        __typename: "CustomerSubscription",
        id: sub.id,
        description: sub.description,
        status: sub.status,
        priceId: sub.items.data[0].price.id,
        amount: unit_amount,
      };
    } catch (err) {
      return throwResolutionError({
        location: `${name?.value}.fetchCustomerSubscription`,
        message: "Unable to fetch your subscription.",
        err,
      });
    }
  };
