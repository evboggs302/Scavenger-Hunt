import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import {
  DeleteAllTeamsByHuntIdDocument,
  GetHuntDocument,
} from "@generated/graphql";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";

export const useDeleteAllTeamsMutation = () => {
  const { hunt } = useHuntFragment();
  const [deleteAllTeam, result] = useMutation(DeleteAllTeamsByHuntIdDocument);

  const handleDeleteAllTeam = useCallback(async () => {
    await deleteAllTeam({
      refetchQueries: [GetHuntDocument],
      variables: {
        hunt_id: hunt._id || "",
      },
    });
  }, [deleteAllTeam, hunt._id]);

  return useMemo(
    (): [typeof handleDeleteAllTeam, typeof result] => [
      handleDeleteAllTeam,
      result,
    ],
    [handleDeleteAllTeam, result]
  );
};
