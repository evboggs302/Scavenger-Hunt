import { MutationResolvers } from "generated/graphql";
import { throwResolutionError } from "../../utils/apolloErrorHandlers";
import { createStripeSubscription } from "../../utils/stripeActions/subscriptions/createStripeSubscription";
import { fetchStripeSubscriptionPriceObject } from "../../utils/stripeActions/subscriptions/fetchStripeSubscriptionPriceObject";

export const resubscribe: MutationResolvers["resubscribe"] = async (
  _parent: unknown,
  _args,
  { accounts },
  { operation: { name } }
) => {
  try {
    const sub = await createStripeSubscription(accounts.stripe_customer_id);

    const subProductId =
      typeof sub.items.data[0].price.product === "string"
        ? sub.items.data[0].price.product
        : sub.items.data[0].price.product.id;

    const { product, unit_amount } = await fetchStripeSubscriptionPriceObject();

    const priceProductId = typeof product === "string" ? product : product.id;

    if (subProductId !== priceProductId) {
      throw new Error("Mismatched products.");
    }

    if (!unit_amount) {
      throw new Error("No product unit amount provided.");
    }

    return {
      __typename: "CustomerSubscription",
      id: sub.id,
      status: sub.status,
      amount: unit_amount,
      priceId: "",
    };
  } catch (err) {
    return throwResolutionError({
      message: "Unable to resubscribe.",
      location: name?.value,
      err,
    });
  }
};
