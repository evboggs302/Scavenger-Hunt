import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { useToast } from "@lib/hooks/useToast";
import {
  FetchAccountTransactionsDocument,
  ResubscribeDocument,
} from "@generated/graphql";

export const useResubscribe = () => {
  const [toast] = useToast();
  const [resubscribe, result] = useMutation(ResubscribeDocument);

  const handleResubscribe = useCallback(async () => {
    await resubscribe({
      refetchQueries: [FetchAccountTransactionsDocument],
      onError: () =>
        toast({
          variant: "error",
          message: "Unable to resubscribe. Try again later",
        }),
    });
  }, [resubscribe, toast]);

  return useMemo(
    (): [typeof handleResubscribe, typeof result] => [
      handleResubscribe,
      result,
    ],
    [handleResubscribe, result]
  );
};
