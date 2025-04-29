import { stripeInstance } from "../stripeInstance";
import { throwResolutionError } from "../apolloErrorHandlers";

export const deleteStripeSubscription = async (subscriptionId: string) => {
  try {
    return await stripeInstance.subscriptions.cancel(subscriptionId);
  } catch (err) {
    return throwResolutionError({
      location: "deleteStripeSubscription",
      message: "Unable to delete Stripe subscription.",
      err,
    });
  }
};
