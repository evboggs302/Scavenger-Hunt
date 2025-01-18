import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { CreateSingleTeamDocument, GetHuntDocument } from "@generated/graphql";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
import { CreateTeamsFormState } from "../components/CreateTeamsDialog/CreateTeamsDialog";
import { useToast } from "@lib/hooks/useToast";

type RequiredFormState = CreateTeamsFormState & { isMulti: false };

export const useCreateSingleTeamMutation = () => {
  const { hunt } = useHuntFragment();
  const [toast] = useToast();

  const [createSingleTeam, result] = useMutation(CreateSingleTeamDocument, {
    refetchQueries: [GetHuntDocument],
    onCompleted: () =>
      toast({
        variant: "success",
        message: "Team created successfully!",
      }),
  });

  const handleCreateSingleTeam = useCallback(
    async ({ team }: RequiredFormState) => {
      await createSingleTeam({
        variables: {
          input: {
            hunt_id: hunt._id || "",
            ...team,
          },
        },
      });
    },
    [createSingleTeam, hunt._id]
  );

  return useMemo(
    (): [typeof handleCreateSingleTeam, typeof result] => [
      handleCreateSingleTeam,
      result,
    ],
    [handleCreateSingleTeam, result]
  );
};
