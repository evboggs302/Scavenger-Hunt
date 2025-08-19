import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import {
  CreateMultipleTeamsDocument,
  GetHuntDocument,
} from "@generated/graphql";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
import { useToast } from "@lib/hooks/useToast";
import type { CreateTeamsFormSchemaType } from "./useCreateTeamsResolver";

export const useCreateTeamsMutation = () => {
  const { hunt } = useHuntFragment();
  const [toast] = useToast();

  const [createMultipleTeams, result] = useMutation(
    CreateMultipleTeamsDocument,
    {
      refetchQueries: [GetHuntDocument],
      onCompleted: () =>
        toast({
          variant: "success",
          message: "Teams created successfully!",
        }),
    }
  );

  const handleCreateMultipleTeams = useCallback(
    async ({ teams }: CreateTeamsFormSchemaType) => {
      await createMultipleTeams({
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
