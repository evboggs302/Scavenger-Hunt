import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import {
  CreateMultipleCluesDocument,
  GetOrderedCluesDocument,
} from "@generated/graphql";
import { CreateCluesFormState } from "../components/CreateCluesDialog/CreateCluesDialog";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";

type RequiredFormState = CreateCluesFormState & { isMulti: true };

export const useCreateMultipleCluesMutation = () => {
  const { hunt } = useHuntFragment();
  const [createMultipleClues, result] = useMutation(
    CreateMultipleCluesDocument
  );

  const handleCreateMultipleClues = useCallback(
    async ({ cluesList }: RequiredFormState) => {
      await createMultipleClues({
        refetchQueries: [GetOrderedCluesDocument],
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
