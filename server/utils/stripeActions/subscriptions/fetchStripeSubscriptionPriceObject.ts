import { stripeInstance } from "../../stripeInstance";
import { subscriptionPoductId } from "../subscriptionPoductId";

/**
 * @description
 * Fetches the Stripe subscription price object for a specific subscription product.
 */
export const fetchStripeSubscriptionPriceObject = async () => {
  const res = await stripeInstance.prices.search({
    query: `product:"${subscriptionPoductId}" AND active:"true"`,
    limit: 1,
  });

  return res.data[0];
};
