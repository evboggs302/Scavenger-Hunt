import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { GetHuntDocument, MarkHuntCompleteDocument } from "@generated/graphql";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";

export const useMarkHuntCompleted = () => {
  const { hunt } = useHuntFragment();
  const [markHuntComplete, result] = useMutation(MarkHuntCompleteDocument);

  const handleMarkHuntComplete = useCallback(async () => {
    await markHuntComplete({
      refetchQueries: [GetHuntDocument],
      variables: {
        hunt_id: hunt._id || "",
      },
    });
  }, [markHuntComplete, hunt._id]);

  return useMemo(
    (): [typeof handleMarkHuntComplete, typeof result] => [
      handleMarkHuntComplete,
      result,
    ],
    [handleMarkHuntComplete, result]
  );
};
