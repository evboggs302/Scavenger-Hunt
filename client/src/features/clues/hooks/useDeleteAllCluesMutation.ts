import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import {
  DeleteAllCluesByHuntIdDocument,
  GetOrderedCluesDocument,
} from "@generated/graphql";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";

export const useDeleteAllCluesMutation = () => {
  const { hunt } = useHuntFragment();
  const [deleteAllClues, result] = useMutation(DeleteAllCluesByHuntIdDocument, {
    refetchQueries: [GetOrderedCluesDocument],
    variables: {
      hunt_id: hunt._id || "",
    },
  });

  const handleDeleteAllClues = useCallback(async () => {
    await deleteAllClues();
  }, [deleteAllClues]);

  return useMemo(
    (): [typeof handleDeleteAllClues, typeof result] => [
      handleDeleteAllClues,
      result,
    ],
    [handleDeleteAllClues, result]
  );
};
