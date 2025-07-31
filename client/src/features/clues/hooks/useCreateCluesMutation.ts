import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import {
  CreateMultipleCluesDocument,
  GetOrderedCluesDocument,
} from "@generated/graphql";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
import { useToast } from "@lib/hooks/useToast";

export const useCreateCluesMutation = () => {
  const { hunt } = useHuntFragment();
  const [toast] = useToast();

  const [createMultipleClues, result] = useMutation(
    CreateMultipleCluesDocument,
    {
      refetchQueries: [GetOrderedCluesDocument],
      onCompleted: () =>
        toast({
          variant: "success",
          message: "Clues created successfully!",
        }),
      onError: () =>
        toast({
          variant: "error",
          message: "Unable to create clues at this time.",
        }),
    }
  );

  const handleCreateMultipleClues = useCallback(
    async (cluesList: string[]) => {
      await createMultipleClues({
        variables: {
          input: {
            h_id: hunt._id || "",
            cluesList,
          },
        },
      });
    },
    [createMultipleClues, hunt._id]
  );

  return useMemo(
    (): [typeof handleCreateMultipleClues, typeof result] => [
      handleCreateMultipleClues,
      result,
    ],
    [handleCreateMultipleClues, result]
  );
};
