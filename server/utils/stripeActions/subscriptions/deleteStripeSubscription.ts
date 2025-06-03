import { stripeInstance } from "@utils/stripeInstance";
import { fetchStripeSubscription } from "./fetchStripeSubscription";

// CHECK FOR UNPAID INVOICES
export const deleteStripeSubscription = async (customerId: string) => {
  const sub = await fetchStripeSubscription(customerId);

  return await stripeInstance.subscriptions.cancel(sub.id);
};
