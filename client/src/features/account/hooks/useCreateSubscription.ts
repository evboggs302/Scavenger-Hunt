import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import {
  CreateSubscriptionDocument,
  FetchAccountTransactionsDocument,
} from "@generated/graphql";
import { useToast } from "@lib/hooks/useToast";

export const useCreateSubscription = () => {
  const [toast] = useToast();
  const [createSubscription, result] = useMutation(CreateSubscriptionDocument);

  const handleCreateSubscription = useCallback(
    async (paymentMethodId: string) => {
      await createSubscription({
        variables: {
          paymentMethodId,
        },
        refetchQueries: [FetchAccountTransactionsDocument],
        onError: () =>
          toast({
            variant: "error",
            message: "Unable to create subscription. Try again later",
          }),
      });
    },
    [createSubscription, toast]
  );

  return useMemo(
    (): [typeof handleCreateSubscription, typeof result] => [
      handleCreateSubscription,
      result,
    ],
    [handleCreateSubscription, result]
  );
};
