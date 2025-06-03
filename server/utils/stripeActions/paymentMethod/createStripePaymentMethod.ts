import { stripeInstance } from "@utils/stripeInstance";
import { throwResolutionError } from "@utils/apolloErrorHandlers";

export const createStripePaymentMethod = async (
  customerId: string,
  paymentMethodId: string
) => {
  try {
    // Attach the payment method to the customer
    const paymentMethod = await stripeInstance.paymentMethods.attach(
      paymentMethodId,
      {
        customer: customerId,
      }
    );

    // Set the payment method as the default for the customer
    const customer = await stripeInstance.customers.update(customerId, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });

    return { paymentMethod, customer };
  } catch (err) {
    return throwResolutionError({
      location: "createStripePaymentMethod",
      message: "Unable to save or associate payment method to user.",
      err,
    });
  }
};
