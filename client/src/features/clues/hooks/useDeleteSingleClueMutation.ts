import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import {
  DeleteClueByIdDocument,
  GetOrderedCluesDocument,
} from "@generated/graphql";
import { useApolloContextHeaders } from "@apolloClient/useApolloContextHeaders";

export const useDeleteSingleClueMutation = () => {
  const headers = useApolloContextHeaders();
  const [deleteSingleClue, result] = useMutation(DeleteClueByIdDocument, {
    context: headers,
  });

  const handleDeleteSingleClue = useCallback(
    async (clue_id: string) => {
      await deleteSingleClue({
        refetchQueries: [GetOrderedCluesDocument],
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
