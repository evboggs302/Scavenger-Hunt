import { stripeInstance } from "@utils/stripeInstance";
import { throwResolutionError } from "@utils/apolloErrorHandlers";

export const createStripeCustomer = async (name: string, email: string) => {
  try {
    const customer = await stripeInstance.customers.create({
      name,
      email,
    });

    return customer.id;
  } catch (err) {
    return throwResolutionError({
      location: "createStripeCustomer",
      message: "Unable to create Stripe customer.",
      err,
    });
  }
};
