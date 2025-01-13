import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import {
  DeleteAllTeamsByHuntIdDocument,
  GetHuntDocument,
} from "@generated/graphql";
<<<<<<< HEAD
import { useApolloContextHeaders } from "@apolloClient/useApolloContextHeaders";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";

export const useDeleteAllTeamsMutation = () => {
  const headers = useApolloContextHeaders();
  const { hunt } = useHuntFragment();
  const [deleteAllTeam, result] = useMutation(DeleteAllTeamsByHuntIdDocument, {
    context: headers,
  });
=======
import { useHuntFragment } from "@lib/hooks/useHuntFragment";

export const useDeleteAllTeamsMutation = () => {
  const { hunt } = useHuntFragment();
  const [deleteAllTeam, result] = useMutation(DeleteAllTeamsByHuntIdDocument);
>>>>>>> subscriptions-and-things

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
