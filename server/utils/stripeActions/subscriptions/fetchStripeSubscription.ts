import { stripeInstance } from "../../stripeInstance";

export const fetchStripeSubscription = async (customerId: string) => {
  return await stripeInstance.subscriptions
    .list({
      customer: customerId,
      limit: 1,
    })
    .then((res) => res?.data?.[0]);
};
