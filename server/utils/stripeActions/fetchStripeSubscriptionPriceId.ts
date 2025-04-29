import { stripeInstance } from "../stripeInstance";
import { throwResolutionError } from "../apolloErrorHandlers";

/**
 * @todo Find a way to parametrize the product ID for the query.
 * @description
 * Fetches the Stripe subscription price ID for a specific subscription product.
 * @returns The Stripe subscription price ID.
 * @throws An error if the fetch operation fails.
 */
export const fetchStripeSubscriptionPriceId = async () => {
  try {
    const res = await stripeInstance.prices.search({
      query: "product:'prod_SBDibULiaqNp2j'",
      limit: 1,
    });

    return res.data[0].id;
  } catch (err) {
    return throwResolutionError({
      location: "fetchStripeSubscriptionPrice",
      message: "Unable to fetch Stripe subscription price.",
      err,
    });
  }
};
