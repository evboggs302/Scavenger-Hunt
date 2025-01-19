import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { ActivateHuntDocument, GetHuntDocument } from "@generated/graphql";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
import { useToast } from "@lib/hooks/useToast";

export const useActivateHuntMutation = () => {
  const { hunt } = useHuntFragment();
  const [toast] = useToast();

  const [activateHunt, result] = useMutation(ActivateHuntDocument, {
    refetchQueries: [GetHuntDocument],
    variables: {
      hunt_id: hunt._id || "",
    },
    onCompleted: () =>
      toast({
        variant: "success",
        message: "Hunt was activated successfully!",
      }),
    onError: () =>
      toast({
        variant: "error",
        message: "Unable to activate this hunt at this time.",
      }),
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
