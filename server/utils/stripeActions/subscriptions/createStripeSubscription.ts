import Stripe from "stripe";
import { stripeInstance } from "../../stripeInstance";
import { fetchStripeSubscriptionPriceObject } from "./fetchStripeSubscriptionPriceObject";

export const createStripeSubscription = async (
  customerId: string,
  payment_method_id?: string
) => {
  const price = await fetchStripeSubscriptionPriceObject();

  const subscription = await stripeInstance.subscriptions.create({
    customer: customerId,
    description: "Monthly subscription",
    collection_method: "charge_automatically",
    default_payment_method: payment_method_id,
    items: [
      {
        price: price.id,
      },
    ],
    expand: ["latest_invoice.confirmation_secret"],
  });

  const latestInvoice = subscription.latest_invoice as Stripe.Invoice;
  const clientSecret = latestInvoice.confirmation_secret?.client_secret;

  return {
    ...subscription,
    clientSecret,
  };
};
