import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { GetHuntDocument, MarkHuntCompleteDocument } from "@generated/graphql";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";

export const useMarkHuntCompleted = () => {
  const { hunt } = useHuntFragment();
  const [markHuntComplete, result] = useMutation(MarkHuntCompleteDocument, {
    refetchQueries: [GetHuntDocument],
    variables: {
      hunt_id: hunt._id || "",
    },
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
