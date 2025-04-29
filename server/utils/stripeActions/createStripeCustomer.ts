import { stripeInstance } from "../stripeInstance";
import { throwResolutionError } from "../apolloErrorHandlers";
import { createStripeSubscription } from "./createStripeSubscription";

export const createStripeCustomer = async (name: string, email: string) => {
  try {
    const customer = await stripeInstance.customers.create({
      name,
      email,
    });

    const subscription = await createStripeSubscription(customer.id);

    return {
      customerId: customer.id,
      subscriptionId: subscription.id,
    };
  } catch (err) {
    return throwResolutionError({
      location: "createStripeCustomer",
      message: "Unable to create Stripe customer.",
      err,
    });
  }
};
