import { stripeInstance } from "../../stripeInstance";
import { throwResolutionError } from "../../apolloErrorHandlers";

export const fetchStripeCustomer = async (customerId: string) => {
  try {
    const customer = await stripeInstance.customers.retrieve(customerId);
    if (!customer || customer.deleted) {
      throw new Error("No Stripe customer found.");
    }
    return customer;
  } catch (error) {
    return throwResolutionError({
      location: "fetchStripeCustomer",
      message: "Unable to find the requested Stripe customer.",
      err: error,
    });
  }
};
