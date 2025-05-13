import { QueryResolvers } from "generated/graphql";
import { throwResolutionError } from "../../utils/apolloErrorHandlers";
import { AccountModel } from "../../models/accounts";
import { createBsonObjectId } from "../../utils/transforms/createBsonObjectId";
import { fetchStripeCharges } from "../../utils/stripeActions/charges/fetchStripeCharges";

export const fetchCharges: QueryResolvers["fetchStripeCharges"] = async (
  _parent: unknown,
  _args,
  { user },
  { operation: { name } }
) => {
  try {
    const user_id = createBsonObjectId(user._id);
    const account = await AccountModel.findOne({ user: user_id }).exec();

    if (!account) {
      throw new Error("No account found.");
    }

    const charges = await fetchStripeCharges(account.stripe_customer_id);

    return charges.map((charge) => {
      const paymentIntent =
        typeof charge.payment_intent === "string"
          ? charge.payment_intent
          : charge.payment_intent?.id;

      return {
        __typename: "StripeCharge",
        id: charge.id,
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
