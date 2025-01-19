import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { GetHuntDocument, MarkHuntCompleteDocument } from "@generated/graphql";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
import { useToast } from "@lib/hooks/useToast";

export const useMarkHuntCompleted = () => {
  const { hunt } = useHuntFragment();
  const [toast] = useToast();

  const [markHuntComplete, result] = useMutation(MarkHuntCompleteDocument, {
    refetchQueries: [GetHuntDocument],
    variables: {
      hunt_id: hunt._id || "",
    },
    onCompleted: () =>
      toast({
        variant: "success",
        message: "Hunt was marked completed successfully!",
      }),
    onError: () =>
      toast({
        variant: "error",
        message: "Unable to mark this hunt complete at this time.",
      }),
  });

  const handleMarkHuntComplete = useCallback(async () => {
    await markHuntComplete();
  }, [markHuntComplete]);

  return useMemo(
    (): [typeof handleMarkHuntComplete, typeof result] => [
      handleMarkHuntComplete,
      result,
    ],
    [handleMarkHuntComplete, result]
  );
};
