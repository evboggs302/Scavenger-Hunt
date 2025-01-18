import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import {
  DeleteClueByIdDocument,
  GetOrderedCluesDocument,
} from "@generated/graphql";
import { useToast } from "@lib/hooks/useToast";

export const useDeleteSingleClueMutation = () => {
  const [toast] = useToast();

  const [deleteSingleClue, result] = useMutation(DeleteClueByIdDocument, {
    refetchQueries: [GetOrderedCluesDocument],
    onCompleted: () =>
      toast({
        variant: "success",
        message: "Clue deleted successfully!",
      }),
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
