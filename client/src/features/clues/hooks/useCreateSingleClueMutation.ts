import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import {
  CreateSingleClueDocument,
  GetOrderedCluesDocument,
} from "@generated/graphql";
import { CreateCluesFormState } from "../components/CreateCluesDialog/CreateCluesDialog";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";

type RequiredFormState = CreateCluesFormState & { isMulti: false };

export const useCreateSingleClueMutation = () => {
  const { hunt } = useHuntFragment();
  const [createSingleClue, result] = useMutation(CreateSingleClueDocument, {
    refetchQueries: [GetOrderedCluesDocument],
  });

  const handleCreateSingleClue = useCallback(
    async ({ clueItem }: RequiredFormState) => {
      await createSingleClue({
        variables: {
          input: {
            h_id: hunt._id || "",
            clueItem,
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
