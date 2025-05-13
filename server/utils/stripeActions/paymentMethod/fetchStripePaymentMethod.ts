import Stripe from "stripe";
import { stripeInstance } from "../../stripeInstance";
import { throwResolutionError } from "../../apolloErrorHandlers";

// Custom type for customer with expanded default payment method
interface ExpandedCustomer extends Stripe.Customer {
  invoice_settings: Stripe.Customer.InvoiceSettings & {
    default_payment_method: Stripe.PaymentMethod;
  };
}

export const fetchStripePaymentMethod = async (customerId: string) => {
  try {
    const customer = (await stripeInstance.customers.retrieve(customerId, {
      expand: ["invoice_settings.default_payment_method"],
    })) as ExpandedCustomer;

    return customer.invoice_settings.default_payment_method;
  } catch (err) {
    return throwResolutionError({
      location: "fetchStripePaymentMethod",
      message: "",
      err,
    });
  }
};
