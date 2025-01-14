import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { DeleteAllResponsesByHuntDocument } from "@generated/graphql";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";

export const useDeleteResponsesByHuntMutation = () => {
  const { hunt } = useHuntFragment();
  const [deleteResponsesByHunt, result] = useMutation(
    DeleteAllResponsesByHuntDocument,
    {
      variables: {
        id: hunt._id || "",
      },
    }
  );

  const handleDeleteResponsesByHunt = useCallback(async () => {
    await deleteResponsesByHunt();
  }, [deleteResponsesByHunt]);

  return useMemo(
    (): [typeof handleDeleteResponsesByHunt, typeof result] => [
      handleDeleteResponsesByHunt,
      result,
    ],
    [handleDeleteResponsesByHunt, result]
  );
};
