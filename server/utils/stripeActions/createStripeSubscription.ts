import { stripeInstance } from "../stripeInstance";
import { throwResolutionError } from "../apolloErrorHandlers";
import { fetchStripeSubscriptionPriceId } from "./fetchStripeSubscriptionPriceId";

export const createStripeSubscription = async (customerId: string) => {
  try {
    const priceId = await fetchStripeSubscriptionPriceId();
    const subscription = await stripeInstance.subscriptions.create({
      customer: customerId,
      collection_method: "charge_automatically",
      items: [
        {
          price: priceId,
        },
      ],
      expand: ["latest_invoice.payment_intent"],
    });

    return subscription;
  } catch (err) {
    return throwResolutionError({
      location: "createStripeSubscription",
      message: "Unable to create Stripe subscription.",
      err,
    });
  }
};
