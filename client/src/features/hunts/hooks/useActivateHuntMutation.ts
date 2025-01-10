import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { ActivateHuntDocument, GetHuntDocument } from "@generated/graphql";
import { useApolloContextHeaders } from "@apolloClient/useApolloContextHeaders";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";

export const useActivateHuntMutation = () => {
  const headers = useApolloContextHeaders();
  const { hunt } = useHuntFragment();
  const [activateHunt, result] = useMutation(ActivateHuntDocument, {
    context: headers,
  });

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
