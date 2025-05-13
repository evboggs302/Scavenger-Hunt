import { stripeInstance } from "../../stripeInstance";
import { throwResolutionError } from "../../apolloErrorHandlers";

/**
 * @description
 * Fetches the Stripe subscription price ID for a specific subscription product.
 * @returns The Stripe subscription price ID.
 * @throws An error if the fetch operation fails.
 */
export const fetchStripeSubscriptionPriceId = async () => {
  // SANDBOX PRODUCT ID
  // "prod_SBDibULiaqNp2j"

  // LIVE SITE PRODUCT ID
  // "prod_SIdBj1f8dSwMt1"

  const productId =
    process.env.NODE_ENV === "production"
      ? "prod_SIdBj1f8dSwMt1"
      : "prod_SBDibULiaqNp2j";

  try {
    const res = await stripeInstance.prices.search({
      query: `product:"${productId}" AND active:"true"`,
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
