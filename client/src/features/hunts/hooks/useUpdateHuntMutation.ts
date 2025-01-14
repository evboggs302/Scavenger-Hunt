import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import {
  GetHuntDocument,
  UpdateHuntDocument,
  UpdateHuntInput,
} from "@generated/graphql";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";

export const useUpdateHuntCompleted = () => {
  const { hunt } = useHuntFragment();
  const [updateHuntComplete, result] = useMutation(UpdateHuntDocument, {
    refetchQueries: [GetHuntDocument],
  });

  const handleUpdateHuntComplete = useCallback(
    async (input: Partial<Omit<UpdateHuntInput, "hunt_id">>) => {
      await updateHuntComplete({
        variables: {
          input: {
            hunt_id: hunt._id || "",
            ...hunt,
            ...input,
          },
        },
      });
    },
    [updateHuntComplete, hunt]
  );

  return useMemo(
    (): [typeof handleUpdateHuntComplete, typeof result] => [
      handleUpdateHuntComplete,
      result,
    ],
    [handleUpdateHuntComplete, result]
  );
};
