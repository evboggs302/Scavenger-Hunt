import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { ActivateHuntDocument, GetHuntDocument } from "@generated/graphql";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";

export const useActivateHuntMutation = () => {
  const { hunt } = useHuntFragment();
  const [activateHunt, result] = useMutation(ActivateHuntDocument);

  const handleActivateHunt = useCallback(async () => {
    await activateHunt({
      refetchQueries: [GetHuntDocument],
      variables: {
        hunt_id: hunt._id || "",
      },
    });
  }, [activateHunt, hunt._id]);

  return useMemo(
    (): [typeof handleActivateHunt, typeof result] => [
      handleActivateHunt,
      result,
    ],
    [handleActivateHunt, result]
  );
};
