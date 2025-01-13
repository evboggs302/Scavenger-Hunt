import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import {
  DeleteAllCluesByHuntIdDocument,
  GetOrderedCluesDocument,
} from "@generated/graphql";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";

export const useDeleteAllCluesMutation = () => {
  const { hunt } = useHuntFragment();
  const [deleteAllClues, result] = useMutation(DeleteAllCluesByHuntIdDocument);

  const handleDeleteAllClues = useCallback(async () => {
    await deleteAllClues({
      refetchQueries: [GetOrderedCluesDocument],
      variables: {
        hunt_id: hunt._id || "",
      },
    });
  }, [deleteAllClues, hunt._id]);

  return useMemo(
    (): [typeof handleDeleteAllClues, typeof result] => [
      handleDeleteAllClues,
      result,
    ],
    [handleDeleteAllClues, result]
  );
};
