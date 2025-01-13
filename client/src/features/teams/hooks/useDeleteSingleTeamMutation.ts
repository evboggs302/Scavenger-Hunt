import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { DeleteTeamByIdDocument, GetHuntDocument } from "@generated/graphql";
<<<<<<< HEAD
import { useApolloContextHeaders } from "@apolloClient/useApolloContextHeaders";

export const useDeleteSingleTeamMutation = () => {
  const headers = useApolloContextHeaders();
  const [deleteSingleTeam, result] = useMutation(DeleteTeamByIdDocument, {
    context: headers,
  });
=======

export const useDeleteSingleTeamMutation = () => {
  const [deleteSingleTeam, result] = useMutation(DeleteTeamByIdDocument);
>>>>>>> subscriptions-and-things

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
