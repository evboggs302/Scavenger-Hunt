import { stripeInstance } from "../../stripeInstance";
import { throwResolutionError } from "../../apolloErrorHandlers";

export const fetchStripeCharges = async (customerId: string) => {
  try {
    const charges = await stripeInstance.charges.list({
      customer: customerId,
    });

    return charges.data;
  } catch (error) {
    return throwResolutionError({
      location: "fetchStripeCharges",
      message: "Unable to fetch Stripe charges.",
      err: error,
    });
  }
};
