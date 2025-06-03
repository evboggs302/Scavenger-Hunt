import { QueryResolvers } from "@generated/graphql";
import { throwResolutionError } from "@utils/apolloErrorHandlers";
import { fetchStripeCharges } from "@utils/stripeActions/charges/fetchStripeCharges";

export const fetchCharges: QueryResolvers["fetchStripeCharges"] = async (
  _parent: unknown,
  _args,
  { accounts },
  { operation: { name } }
) => {
  try {
    const charges = await fetchStripeCharges(accounts.stripe_customer_id);

    return charges.map((charge) => {
      const paymentIntent =
        typeof charge.payment_intent === "string"
          ? charge.payment_intent
          : charge.payment_intent?.id;

      return {
        __typename: "StripeCharge",
        id: charge.id,
        date: charge.created,
        status: charge.status,
        amount: charge.amount,
        description: charge.description,
        paymentIntent,
        paymentCard: {
          __typename: "PaymentCard",
          brand: charge.payment_method_details?.card?.brand,
          last4: charge.payment_method_details?.card?.last4,
        },
      };
    });
  } catch (err) {
    return throwResolutionError({
      location: name?.value,
      message: "Unable to fetch your subscription.",
      err,
    });
  }
};
