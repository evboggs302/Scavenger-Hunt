import config from "@/config";
import { MongoClient, Db } from "mongodb";
import { ResponsePayload } from "@generated/graphql";
import { MongodbPubSub } from "graphql-mongodb-subscriptions";
import { RESPONSE_RECEIVED_TOPIC } from "@resolvers/responses/resolvers/responseSubscriptions.resolver";

/**
 * Production PubSub
 */
const { MONGO_URI } = config;
const mdbClient = new MongoClient(MONGO_URI);
const connectionDb: Db = mdbClient.db();

export const mongodbPubSub = new MongodbPubSub({
  connectionDb,
});

export const publishReceivedResponse = (response: ResponsePayload) =>
  mongodbPubSub.publish<ResponsePayload>(RESPONSE_RECEIVED_TOPIC, response);
