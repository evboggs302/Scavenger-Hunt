import { MutationResolvers } from "generated/graphql";
import { throwResolutionError } from "../../utils/apolloErrorHandlers";
import { createStripeSubscription } from "../../utils/stripeActions/subscriptions/createStripeSubscription";
import { createStripePaymentMethod } from "../../utils/stripeActions/paymentMethod/createStripePaymentMethod";

export const createSubscription: MutationResolvers["createSubscription"] =
  async (
    _parent: unknown,
    { payment_method_id },
    { accounts },
    { operation: { name } }
  ) => {
    try {
      await createStripePaymentMethod(
        accounts.stripe_customer_id,
        payment_method_id
      );

      const sub = await createStripeSubscription(
        accounts.stripe_customer_id,
        payment_method_id
      );

      if (!sub.clientSecret) {
        throw new Error();
      }

      return {
        __typename: "CreateSubscriptionPayload",
        id: sub.id,
        clientSecret: sub.clientSecret,
      };
    } catch (err) {
      return throwResolutionError({
        message: "Unable to create the desired subscription.",
        location: name?.value,
        err,
      });
    }
  };
