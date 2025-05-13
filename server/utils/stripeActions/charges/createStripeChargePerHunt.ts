import { stripeInstance } from "../../stripeInstance";
import { throwResolutionError } from "../../apolloErrorHandlers";
import { HuntDocType } from "../../../models/hunts";
import { AccountDocument } from "../../../models/accounts";

export const createStripeChargePerHunt = async (
  { stripe_customer_id }: AccountDocument,
  { name, balance_usd }: HuntDocType
) => {
  try {
    // FETCH SUBSCRIPTION
    const default_payment_method = await stripeInstance.subscriptions
      .list({
        customer: stripe_customer_id,
        status: "active",
        limit: 1, // Adjust as needed
      })
      .then((res) => {
        if (!res) {
          return undefined;
        }

        return res.data[0].default_payment_method || "";
      });

    const charge = await stripeInstance.paymentIntents.create({
      amount: balance_usd || 0.5,
      currency: "usd",
      customer: stripe_customer_id,
      description: `SMS/MMS data rates: ${name}`,
      capture_method: "automatic_async",
      payment_method: default_payment_method?.toString(),
      off_session: true,
      confirm: true,
    });

    return charge;
  } catch (err) {
    return throwResolutionError({
      location: "createStripeCharge",
      message: "Unable to create Stripe charge.",
      err,
    });
  }
};
