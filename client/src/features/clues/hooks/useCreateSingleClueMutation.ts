import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import {
  CreateSingleClueDocument,
  GetOrderedCluesDocument,
} from "@generated/graphql";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
import { useToast } from "@lib/hooks/useToast";

export const useCreateSingleClueMutation = () => {
  const { hunt } = useHuntFragment();
  const [toast] = useToast();

  const [createSingleClue, result] = useMutation(CreateSingleClueDocument, {
    refetchQueries: [GetOrderedCluesDocument],
    onCompleted: () =>
      toast({
        variant: "success",
        message: "Clue created successfully!",
      }),
    onError: () =>
      toast({
        variant: "error",
        message: "Unable to create this clue at this time.",
      }),
  });

  const handleCreateSingleClue = useCallback(
    async (description: string) => {
      await createSingleClue({
        variables: {
          input: {
            h_id: hunt._id || "",
            description,
          },
        },
      });
    },
    [createSingleClue, hunt._id]
  );

  return useMemo(
    (): [typeof handleCreateSingleClue, typeof result] => [
      handleCreateSingleClue,
      result,
    ],
    [handleCreateSingleClue, result]
  );
};
