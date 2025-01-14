import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import {
  DeleteAllTeamsByHuntIdDocument,
  GetHuntDocument,
} from "@generated/graphql";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";

export const useDeleteAllTeamsMutation = () => {
  const { hunt } = useHuntFragment();
  const [deleteAllTeams, result] = useMutation(DeleteAllTeamsByHuntIdDocument, {
    refetchQueries: [GetHuntDocument],
    variables: {
      hunt_id: hunt._id || "",
    },
  });

  const handleDeleteAllTeams = useCallback(async () => {
    await deleteAllTeams();
  }, [deleteAllTeams]);

  return useMemo(
    (): [typeof handleDeleteAllTeams, typeof result] => [
      handleDeleteAllTeams,
      result,
    ],
    [handleDeleteAllTeams, result]
  );
};
