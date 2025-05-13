import { Resolvers, ResponsePayload } from "generated/graphql";
import { TeamModel } from "../../../models/teams";
import { createBsonObjectId } from "../../../utils/transforms/createBsonObjectId";
import { withFilter } from "graphql-subscriptions";
import { mongodbPubSub } from "../../../utils/pubSub";
import { SubscriptionContext } from "../../../utils/serverSetup/subscriptionContext";

export const RESPONSE_RECEIVED_TOPIC = "RESPONSE_RECEIVED_TOPIC";

const resolver: Resolvers = {
  Subscription: {
    responseReceived: {
      subscribe: withFilter<unknown, { hunt_id: string }, SubscriptionContext>(
        () => mongodbPubSub.asyncIterator(RESPONSE_RECEIVED_TOPIC),
        async (payload, variables, _ctxt) => {
          // console.log("payload: ", payload);
          // console.log("variables: ", variables);
          // console.log("context: ", context);
          try {
            const team_id = createBsonObjectId(
              (payload as ResponsePayload).team_id
            );
            const team = await TeamModel.findOne<{
              hunt_id: ReturnType<typeof createBsonObjectId>;
            }>(
              {
                _id: team_id,
              },
              "hunt_id"
            ).exec();

            return team?.hunt_id === variables?.hunt_id;
          } catch {
            return false;
          }
        }
      ),
    },
  },
};

export default { ...resolver };
