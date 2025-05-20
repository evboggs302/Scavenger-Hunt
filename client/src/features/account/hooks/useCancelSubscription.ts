import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import {
  CancelSubscriptionDocument,
  FetchAccountTransactionsDocument,
} from "@generated/graphql";
import { useToast } from "@lib/hooks/useToast";

export const useCancelSubscription = () => {
  const [toast] = useToast();
  const [cancelSubscription, result] = useMutation(CancelSubscriptionDocument);

  const handleCancelSubscription = useCallback(async () => {
    await cancelSubscription({
      refetchQueries: [FetchAccountTransactionsDocument],
      onError: () =>
        toast({
          variant: "error",
          message: "Unable to cancel subscription. Try again later",
        }),
    });
  }, [cancelSubscription, toast]);

  return useMemo(
    (): [typeof handleCancelSubscription, typeof result] => [
      handleCancelSubscription,
      result,
    ],
    [handleCancelSubscription, result]
  );
};
