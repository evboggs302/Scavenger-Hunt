import { stripeInstance } from "../../stripeInstance";
import { throwResolutionError } from "../../apolloErrorHandlers";

export const fetchStripeSubscription = async (customerId: string) => {
  try {
    const subscription = await stripeInstance.subscriptions
      .list({
        customer: customerId,
        limit: 1,
      })
      .then((res) => res?.data?.[0]);

    return subscription;
  } catch (error) {
    return throwResolutionError({
      location: "fetchStripeSubscriptionId",
      message: "Unable to fetch Stripe subscription.",
      err: error,
    });
  }
};
