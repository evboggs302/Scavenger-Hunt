import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import {
  CreateMultipleCluesDocument,
  GetOrderedCluesDocument,
} from "@generated/graphql";
import { CreateCluesFormState } from "../components/CreateCluesDialog/CreateCluesDialog";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
import { useToast } from "@lib/hooks/useToast";

type RequiredFormState = CreateCluesFormState & { isMulti: true };

export const useCreateMultipleCluesMutation = () => {
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
    }
  );

  const handleCreateMultipleClues = useCallback(
    async ({ cluesList }: RequiredFormState) => {
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
