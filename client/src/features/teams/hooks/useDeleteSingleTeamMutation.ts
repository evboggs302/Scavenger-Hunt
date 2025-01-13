import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { DeleteTeamByIdDocument, GetHuntDocument } from "@generated/graphql";

export const useDeleteSingleTeamMutation = () => {
  const [deleteSingleTeam, result] = useMutation(DeleteTeamByIdDocument);

  const handleDeleteSingleTeam = useCallback(
    async (team_id: string) => {
      await deleteSingleTeam({
        refetchQueries: [GetHuntDocument],
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
