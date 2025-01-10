import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import {
  CreateSingleClueDocument,
  GetOrderedCluesDocument,
} from "@generated/graphql";
import { useApolloContextHeaders } from "@apolloClient/useApolloContextHeaders";
import { CreateCluesFormState } from "../components/CreateCluesDialog/CreateCluesDialog";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";

type RequiredFormState = CreateCluesFormState & { isMulti: false };

export const useCreateSingleClueMutation = () => {
  const headers = useApolloContextHeaders();
  const { hunt } = useHuntFragment();
  const [createSingleClue, result] = useMutation(CreateSingleClueDocument, {
    context: headers,
  });

  const handleCreateSingleClue = useCallback(
    async ({ clueItem }: RequiredFormState) => {
      await createSingleClue({
        refetchQueries: [GetOrderedCluesDocument],
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
