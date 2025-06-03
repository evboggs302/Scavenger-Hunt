import { Resolvers } from "@generated/graphql";
import { createSubscription } from "../createSubscription";
import { fetchCustomerSubscription } from "../fetchCustomerSubscription";
import { fetchCharges } from "../fetchCharges";
import { fetchPaymentMethod } from "../fetchPaymentMethod";
import { fetchSubscriptionProduct } from "../fetchSubscriptionProduct";
import { resubscribe } from "../resubscribe";
import { cancelSubscription } from "../cancelSubscription";

const resolver: Resolvers = {
  Mutation: {
    createSubscription,
    resubscribe,
    cancelSubscription,
  },
  Query: {
    fetchCustomerSubscription,
    fetchSubscriptionProduct,
    fetchStripeCharges: fetchCharges,
    fetchStripePaymentMethod: fetchPaymentMethod,
  },
};

export default { ...resolver };
