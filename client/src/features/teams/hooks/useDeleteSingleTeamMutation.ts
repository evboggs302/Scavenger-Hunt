import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { DeleteTeamByIdDocument, GetHuntDocument } from "@generated/graphql";
import { useApolloContextHeaders } from "@apolloClient/useApolloContextHeaders";

export const useDeleteSingleTeamMutation = () => {
  const headers = useApolloContextHeaders();
  const [deleteSingleTeam, result] = useMutation(DeleteTeamByIdDocument, {
    context: headers,
  });

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
