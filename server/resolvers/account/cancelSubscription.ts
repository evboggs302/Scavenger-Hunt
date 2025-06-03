import { MutationResolvers } from "@generated/graphql";
import { throwResolutionError } from "@utils/apolloErrorHandlers";
import { deleteStripeSubscription } from "@utils/stripeActions/subscriptions/deleteStripeSubscription";

/**
 * @todo confirm no outstanding invoices before deleting
 */
export const cancelSubscription: MutationResolvers["cancelSubscription"] =
  async (_parent: unknown, _args, { accounts }, { operation: { name } }) => {
    try {
      const subscription = await deleteStripeSubscription(
        accounts.stripe_customer_id
      );

      return subscription.status === "canceled";
    } catch (err) {
      return throwResolutionError({
        location: name?.value,
        message: "Unable to cancel your subscription at this time.",
        err,
      });
    }
  };
