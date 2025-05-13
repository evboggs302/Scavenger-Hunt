import { MutationResolvers } from "generated/graphql";
import { throwResolutionError } from "../../utils/apolloErrorHandlers";
import { createStripeSubscription } from "../../utils/stripeActions/subscriptions/createStripeSubscription";
import { AccountModel } from "../../models/accounts";
import { createBsonObjectId } from "../../utils/transforms/createBsonObjectId";
import { createStripePaymentMethod } from "../../utils/stripeActions/paymentMethod/createStripePaymentMethod";

export const createSubscription: MutationResolvers["createSubscription"] =
  async (
    _parent: unknown,
    { payment_method_id },
    { user },
    { operation: { name } }
  ) => {
    try {
      const acct_id = createBsonObjectId(user.account);
      const account = await AccountModel.findById(acct_id).exec();

      if (!account) {
        return throwResolutionError({
          location: name?.value,
          message: "No account found matching this user.",
        });
      }

      await createStripePaymentMethod(
        account.stripe_customer_id,
        payment_method_id
      );

      const sub = await createStripeSubscription(
        account.stripe_customer_id,
        payment_method_id
      );

      const productId =
        typeof sub.items.data[0].price.product === "string"
          ? sub.items.data[0].price.product
          : sub.items.data[0].price.product.id;

      return {
        __typename: "StripeSubscription",
        id: sub.id,
        description: sub.description,
        status: sub.status,
        priceId: sub.items.data[0].price.id,
        productId,
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
