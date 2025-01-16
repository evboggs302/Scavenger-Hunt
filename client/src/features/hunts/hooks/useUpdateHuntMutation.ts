import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import {
  GetHuntDocument,
  UpdateHuntDocument,
  UpdateHuntInput,
} from "@generated/graphql";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";

export const useUpdateHuntMutation = () => {
  const { hunt } = useHuntFragment();
  const [updateHunt, result] = useMutation(UpdateHuntDocument, {
    refetchQueries: [GetHuntDocument],
  });

  const handleUpdateHunt = useCallback(
    async (input: Partial<Omit<UpdateHuntInput, "hunt_id">>) => {
      await updateHunt({
        variables: {
          input: {
            hunt_id: hunt._id || "",
            ...hunt,
            ...input,
          },
        },
      });
    },
    [updateHunt, hunt]
  );

  return useMemo(
    (): [typeof handleUpdateHunt, typeof result] => [handleUpdateHunt, result],
    [handleUpdateHunt, result]
  );
};
