import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import {
  DeleteAllCluesByHuntIdDocument,
  DeleteAllResponsesByHuntDocument,
  DeleteAllTeamsByHuntIdDocument,
  DeleteHuntDocument,
} from "@generated/graphql";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";

export const useDeleteHuntMutation = () => {
  const { hunt } = useHuntFragment();
  const [deleteAllClues, { loading: clueLoading, error: clueError }] =
    useMutation(DeleteAllCluesByHuntIdDocument, {
      variables: {
        hunt_id: hunt._id || "",
      },
    });
  const [deleteAllTeams, { loading: teamLoading, error: teamError }] =
    useMutation(DeleteAllTeamsByHuntIdDocument, {
      variables: {
        hunt_id: hunt._id || "",
      },
    });
  const [
    deleteAllResponses,
    { loading: responseLoading, error: responseError },
  ] = useMutation(DeleteAllResponsesByHuntDocument, {
    variables: {
      id: hunt._id || "",
    },
  });
  const [deleteHunt, { loading: huntLoading, error: huntError }] = useMutation(
    DeleteHuntDocument,
    {
      variables: {
        hunt_id: hunt._id || "",
      },
    }
  );

  const handleDeleteHunt = useCallback(async () => {
    Promise.all([
      deleteAllResponses,
      deleteAllClues,
      deleteAllTeams,
      deleteHunt,
    ]);
  }, [deleteAllClues, deleteAllResponses, deleteAllTeams, deleteHunt]);

  return useMemo((): [typeof handleDeleteHunt, typeof result] => {
    const result = {
      loading: responseLoading || clueLoading || teamLoading || huntLoading,
      error: responseError || clueError || teamError || huntError,
    };
    return [handleDeleteHunt, result];
  }, [
    clueError,
    clueLoading,
    handleDeleteHunt,
    huntError,
    huntLoading,
    responseError,
    responseLoading,
    teamError,
    teamLoading,
  ]);
};
