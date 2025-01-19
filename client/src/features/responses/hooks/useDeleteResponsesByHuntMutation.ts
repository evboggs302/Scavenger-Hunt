import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { DeleteAllResponsesByHuntDocument } from "@generated/graphql";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
import { useToast } from "@lib/hooks/useToast";

export const useDeleteResponsesByHuntMutation = () => {
  const { hunt } = useHuntFragment();
  const [toast] = useToast();

  const [deleteResponsesByHunt, result] = useMutation(
    DeleteAllResponsesByHuntDocument,
    {
      variables: {
        id: hunt._id || "",
      },
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
