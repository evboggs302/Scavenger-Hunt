import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { DeleteTeamByIdDocument, GetHuntDocument } from "@generated/graphql";
import { useToast } from "@lib/hooks/useToast";

export const useDeleteSingleTeamMutation = () => {
  const [toast] = useToast();

  const [deleteSingleTeam, result] = useMutation(DeleteTeamByIdDocument, {
    refetchQueries: [GetHuntDocument],
    onCompleted: () =>
      toast({
        variant: "success",
        message: "Team deleted successfully!",
      }),
  });

  const handleDeleteSingleTeam = useCallback(
    async (team_id: string) => {
      await deleteSingleTeam({
        variables: {
          team_id,
        },
      });
    },
    [deleteSingleTeam]
  );

  return useMemo(
    (): [typeof handleDeleteSingleTeam, typeof result] => [
      handleDeleteSingleTeam,
      result,
    ],
    [handleDeleteSingleTeam, result]
  );
};
