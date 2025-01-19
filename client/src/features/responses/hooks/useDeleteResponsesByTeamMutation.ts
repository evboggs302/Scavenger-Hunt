import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import {
  DeleteAllResponsesByTeamDocument,
  GetAllResponsesByHuntIdDocument,
  GetResponseCountByHuntIdDocument,
} from "@generated/graphql";
import { useToast } from "@lib/hooks/useToast";

export const useDeleteResponsesByTeamMutation = () => {
  const [toast] = useToast();

  const [deleteResponsesByTeam, result] = useMutation(
    DeleteAllResponsesByTeamDocument,
    {
      refetchQueries: [
        GetAllResponsesByHuntIdDocument,
        GetResponseCountByHuntIdDocument,
      ],
      onCompleted: () =>
        toast({
          variant: "success",
          message: "Responses were deleted successfully!",
        }),
      onError: () =>
        toast({
          variant: "error",
          message: "Unable to delete responses at this time.",
        }),
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
