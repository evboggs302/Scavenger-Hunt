import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { ActivateHuntDocument, GetHuntDocument } from "@generated/graphql";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";

export const useActivateHuntMutation = () => {
  const { hunt } = useHuntFragment();
  const [activateHunt, result] = useMutation(ActivateHuntDocument, {
    refetchQueries: [GetHuntDocument],
    variables: {
      hunt_id: hunt._id || "",
    },
  });

  const handleActivateHunt = useCallback(async () => {
    await activateHunt();
  }, [activateHunt]);

  return useMemo(
    (): [typeof handleActivateHunt, typeof result] => [
      handleActivateHunt,
      result,
    ],
    [handleActivateHunt, result]
  );
};
