import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import {
  GetOrderedCluesDocument,
  UpdateClueDescriptionDocument,
} from "@generated/graphql";
import { useToast } from "@lib/hooks/useToast";

export const useUpdateClueDescriptionMutation = () => {
  const [toast] = useToast();

  const [updateSingleClue, result] = useMutation(
    UpdateClueDescriptionDocument,
    {
      refetchQueries: [GetOrderedCluesDocument],
      onCompleted: () =>
        toast({
          variant: "success",
          message: "Clue updated successfully!",
        }),
      onError: () =>
        toast({
          variant: "error",
          message: "Unable to update this clue at this time.",
        }),
    }
  );

  const handleUpdateSingleClue = useCallback(
    async ({
      clue_id,
      description,
    }: {
      clue_id: string;
      description: string;
    }) => {
      await updateSingleClue({
        variables: {
          input: {
            clue_id,
            newDescription: description,
          },
        },
      });
    },
    [updateSingleClue]
  );

  return useMemo(
    (): [typeof handleUpdateSingleClue, typeof result] => [
      handleUpdateSingleClue,
      result,
    ],
    [handleUpdateSingleClue, result]
  );
};
