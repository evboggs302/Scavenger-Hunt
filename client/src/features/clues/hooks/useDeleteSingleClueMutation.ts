import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import {
  DeleteClueByIdDocument,
  GetOrderedCluesDocument,
} from "@generated/graphql";

export const useDeleteSingleClueMutation = () => {
  const [deleteSingleClue, result] = useMutation(DeleteClueByIdDocument, {
    refetchQueries: [GetOrderedCluesDocument],
  });

  const handleDeleteSingleClue = useCallback(
    async (clue_id: string) => {
      await deleteSingleClue({
        variables: {
          clue_id,
        },
      });
    },
    [deleteSingleClue]
  );

  return useMemo(
    (): [typeof handleDeleteSingleClue, typeof result] => [
      handleDeleteSingleClue,
      result,
    ],
    [handleDeleteSingleClue, result]
  );
};
