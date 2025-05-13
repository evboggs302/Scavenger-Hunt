import Stripe from "stripe";
import { stripeInstance } from "../../stripeInstance";
import { throwResolutionError } from "../../apolloErrorHandlers";
import { fetchStripeSubscriptionPriceId } from "./fetchStripeSubscriptionPriceId";

export const createStripeSubscription = async (
  customerId: string,
  payment_method_id: string
) => {
  try {
    const priceId = await fetchStripeSubscriptionPriceId();

    const subscription = await stripeInstance.subscriptions.create({
      customer: customerId,
      description: "Monthly subscription",
      collection_method: "charge_automatically",
      default_payment_method: payment_method_id,
      items: [
        {
          price: priceId,
        },
      ],
      expand: ["latest_invoice.payment_intent"],
    });

    const latestInvoice = subscription.latest_invoice as Stripe.Invoice;
    const clientSecret = latestInvoice.confirmation_secret?.client_secret;

    return {
      ...subscription,
      clientSecret,
    };
  } catch (err) {
    return throwResolutionError({
      location: "createStripeSubscription",
      message: "Unable to create Stripe subscription.",
      err,
    });
  }
};
