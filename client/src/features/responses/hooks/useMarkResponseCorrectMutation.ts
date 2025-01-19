import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { MarkResponseCorrectDocument } from "@generated/graphql";
import { useToast } from "@lib/hooks/useToast";

export const useMarkResponseCorrectMutation = () => {
  const [toast] = useToast();

  const [markResponseCorrect, result] = useMutation(
    MarkResponseCorrectDocument,
    {
      onCompleted: () =>
        toast({
          variant: "success",
          message: "Response was marked correct successfully!",
        }),
      onError: () =>
        toast({
          variant: "error",
          message: "Unable to mark response correct at this time.",
        }),
    }
  );

  const handleMarkResponseCorrect = useCallback(
    async (id: string) => {
      await markResponseCorrect({
        variables: {
          id,
        },
      });
    },
    [markResponseCorrect]
  );

  return useMemo(
    (): [typeof handleMarkResponseCorrect, typeof result] => [
      handleMarkResponseCorrect,
      result,
    ],
    [handleMarkResponseCorrect, result]
  );
};
