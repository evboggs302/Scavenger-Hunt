import { useQuery } from "@apollo/client";
import { FetchSubscriptionProductDocument } from "@generated/graphql";

export const useFetchSubscriptionProduct = () => {
  return useQuery(FetchSubscriptionProductDocument, {
    fetchPolicy: "network-only",
    pollInterval: 120_000,
  });
};
