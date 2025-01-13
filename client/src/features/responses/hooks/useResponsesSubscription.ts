import { useState } from "react";
import { useSubscription } from "@apollo/client";
import {
  ResponseReceivedDocument,
  ResponseReceivedSubscription,
} from "@generated/graphql";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";

export const useResponsesSubscription = () => {
  const { hunt } = useHuntFragment();
  const [accumulatedData, setAccumulatedData] = useState<
    ResponseReceivedSubscription["responseReceived"][]
  >([]);
  const { error, loading } = useSubscription(ResponseReceivedDocument, {
    variables: {
      hunt_id: hunt._id || "",
    },
    onData({ data: { data } }) {
      console.log(data);
      setAccumulatedData((prev) => [...prev, data?.responseReceived]);
    },
  });
  return {
    accumulatedData,
    error,
    loading,
  };
};
