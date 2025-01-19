import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import {
  DeleteAllCluesByHuntIdDocument,
  GetOrderedCluesDocument,
} from "@generated/graphql";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
import { useToast } from "@lib/hooks/useToast";

export const useDeleteAllCluesMutation = () => {
  const { hunt } = useHuntFragment();
  const [toast] = useToast();

  const [deleteAllClues, result] = useMutation(DeleteAllCluesByHuntIdDocument, {
    refetchQueries: [GetOrderedCluesDocument],
    variables: {
      hunt_id: hunt._id || "",
    },
    onCompleted: () =>
      toast({
        variant: "success",
        message: "Clues deleted successfully!",
      }),
    onError: () =>
      toast({
        variant: "error",
        message: "Unable to delete clues at this time.",
      }),
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
