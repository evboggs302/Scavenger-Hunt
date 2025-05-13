import { Resolvers } from "generated/graphql";
import { createSubscription } from "../createSubscription";
import { fetchSubscription } from "../fetchSubscription";
import { fetchCharges } from "../fetchCharges";
import { fetchPaymentMethod } from "../fetchPaymentMethod";

const resolver: Resolvers = {
  Mutation: {
    createSubscription,
  },
  Query: {
    fetchStripeSubscription: fetchSubscription,
    fetchStripeCharges: fetchCharges,
    fetchStripePaymentMethod: fetchPaymentMethod,
    // fetchStripePaymentIntents:
  },
};

export default { ...resolver };
