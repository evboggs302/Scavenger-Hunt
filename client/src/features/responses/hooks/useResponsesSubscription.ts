import { useState } from "react";
import { ApolloError, useSubscription } from "@apollo/client";
import {
  ResponsePayload,
  ResponseReceivedDocument,
  ResponseReceivedSubscription,
} from "@generated/graphql";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";

type UseResponsesSubscriptionReturn = {
  accumulatedData: ResponsePayload[];
  error?: ApolloError;
  loading: boolean;
};

export const useResponsesSubscription = (): UseResponsesSubscriptionReturn => {
  const { hunt } = useHuntFragment();
  const [accumulatedData, setAccumulatedData] = useState<
    ResponseReceivedSubscription["responseReceived"][]
  >([]);

  const { error, loading } = useSubscription(ResponseReceivedDocument, {
    variables: {
      hunt_id: hunt._id || "",
    },
    onData({ data: { data } }) {
      console.log("useSubscription data: ", data);
      setAccumulatedData((prev) => [...prev, data?.responseReceived]);
    },
  });

  return {
    accumulatedData: accumulatedData.filter((res) => !!res),
    error,
    loading,
  };
};
