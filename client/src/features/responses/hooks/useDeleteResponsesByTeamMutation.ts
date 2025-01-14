import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import {
  DeleteAllResponsesByTeamDocument,
  GetAllResponsesByHuntIdDocument,
  GetResponseCountByHuntIdDocument,
} from "@generated/graphql";

export const useDeleteResponsesByTeamMutation = () => {
  const [deleteResponsesByTeam, result] = useMutation(
    DeleteAllResponsesByTeamDocument,
    {
      refetchQueries: [
        GetAllResponsesByHuntIdDocument,
        GetResponseCountByHuntIdDocument,
      ],
    }
  );

  const handleDeleteResponsesByTeam = useCallback(
    async (team_id: string) => {
      await deleteResponsesByTeam({
        variables: {
          id: team_id,
        },
      });
    },
    [deleteResponsesByTeam]
  );

  return useMemo(
    (): [typeof handleDeleteResponsesByTeam, typeof result] => [
      handleDeleteResponsesByTeam,
      result,
    ],
    [handleDeleteResponsesByTeam, result]
  );
};
