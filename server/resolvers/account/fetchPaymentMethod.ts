import { QueryResolvers } from "@generated/graphql";
import { throwResolutionError } from "@utils/apolloErrorHandlers";
import { fetchStripePaymentMethod } from "@utils/stripeActions/paymentMethod/fetchStripePaymentMethod";

export const fetchPaymentMethod: QueryResolvers["fetchStripePaymentMethod"] =
  async (_parent: unknown, _args, { accounts }, { operation: { name } }) => {
    try {
      const { id, card } = await fetchStripePaymentMethod(
        accounts.stripe_customer_id
      );

      // if (!id) {
      //   return null;
      // }

      return {
        __typename: "PaymentMethod",
        id,
        brand: card?.brand || "",
        last4: card?.last4 || "",
      };
    } catch (err) {
      return throwResolutionError({
        location: name?.value,
        message: "fetchPaymentMethodResolver",
        err,
      });
    }
  };
