import { stripeInstance } from "@utils/stripeInstance";
import { throwResolutionError } from "@utils/apolloErrorHandlers";

export const deleteStripeCustomer = async (customerId: string) => {
  try {
    // CHECK IF CUSTOMER HAS OUTSTANDING BALANCE
    const customer = await stripeInstance.customers.retrieve(customerId);
    if (customer && !customer.deleted && customer.balance > 0) {
      return throwResolutionError({
        location: "deleteStripeCustomer",
        message: "Customer has an outstanding balance.",
      });
    }

    // DELETE CUSTOMER
    return await stripeInstance.customers.del(customerId);
  } catch (err) {
    return throwResolutionError({
      location: "deleteStripeCustomer",
      message: "Unable to delete Stripe customer.",
      err,
    });
  }
};
