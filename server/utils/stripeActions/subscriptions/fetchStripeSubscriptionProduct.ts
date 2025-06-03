import Stripe from "stripe";
import { stripeInstance } from "@utils/stripeInstance";
import { subscriptionPoductId } from "../subscriptionPoductId";

export const fetchStripeSubscriptionProduct = async () => {
  const subscriptionProduct = await stripeInstance.products.retrieve(
    subscriptionPoductId,
    {
      expand: ["default_price"],
    }
  );

  return {
    ...subscriptionProduct,
    default_price: subscriptionProduct.default_price as Stripe.Price,
  };
};
