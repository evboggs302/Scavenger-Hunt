import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import {
  GetHuntDocument,
  UpdateTeamDocument,
  type UpdateTeamInput,
} from "@generated/graphql";
import { useToast } from "@lib/hooks/useToast";

export const useUpdateTeamMutation = () => {
  const [toast] = useToast();

  const [updateTeam, result] = useMutation(UpdateTeamDocument, {
    refetchQueries: [GetHuntDocument],
    onCompleted: () =>
      toast({
        variant: "success",
        message: "Team updated successfully!",
      }),
    onError: () =>
      toast({
        variant: "error",
        message: "Unable to update this team at this time.",
      }),
  });

  const handleUpdateTeam = useCallback(
    async (input: UpdateTeamInput) => {
      await updateTeam({
        variables: {
          input,
        },
      });
    },
    [updateTeam]
  );

  return useMemo(
    (): [typeof handleUpdateTeam, typeof result] => [handleUpdateTeam, result],
    [handleUpdateTeam, result]
  );
};
