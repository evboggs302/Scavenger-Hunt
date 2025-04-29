import { stripeInstance } from "../stripeInstance";
import { throwResolutionError } from "../apolloErrorHandlers";

export const fetchStripeSubscription = async (customerId: string) => {
  try {
    const subscription = await stripeInstance.subscriptions
      .list({
        customer: customerId,
        status: "active",
        limit: 1,
      })
      .then((res) => res?.data?.[0]);

    if (!subscription.id) {
      throw new Error("No active subscription found");
    } else {
      return subscription;
    }
  } catch (error) {
    return throwResolutionError({
      location: "fetchStripeSubscriptionId",
      message: "Unable to fetch Stripe subscription ID.",
      err: error,
    });
  }
};
