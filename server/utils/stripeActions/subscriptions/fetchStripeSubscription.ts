import { stripeInstance } from "@utils/stripeInstance";

export const fetchStripeSubscription = async (customerId: string) => {
  return await stripeInstance.subscriptions
    .list({
      customer: customerId,
      limit: 1,
    })
    .then((res) => res?.data?.[0]);
};
