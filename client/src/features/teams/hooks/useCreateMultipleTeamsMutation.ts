import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import {
  CreateMultipleTeamsDocument,
  GetHuntDocument,
} from "@generated/graphql";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
import { CreateTeamsFormState } from "../components/CreateTeamsDialog/CreateTeamsDialog";

type RequiredFormState = CreateTeamsFormState & { isMulti: true };

export const useCreateMultipleTeamsMutation = () => {
  const { hunt } = useHuntFragment();
  const [createMultipleTeams, result] = useMutation(
    CreateMultipleTeamsDocument
  );

  const handleCreateMultipleTeams = useCallback(
    async ({ teams }: RequiredFormState) => {
      await createMultipleTeams({
        refetchQueries: [GetHuntDocument],
        variables: {
          input: {
            hunt_id: hunt._id || "",
            teams,
          },
        },
      });
    },
    [createMultipleTeams, hunt._id]
  );

  return useMemo(
    (): [typeof handleCreateMultipleTeams, typeof result] => [
      handleCreateMultipleTeams,
      result,
    ],
    [handleCreateMultipleTeams, result]
  );
};
