import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import {
  type ClueFragment,
  GetOrderedCluesDocument,
  UpdateClueOrderDocument,
} from "@generated/graphql";
import { useToast } from "@lib/hooks/useToast";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";

export const useUpdateClueOrderMutation = () => {
  const [toast] = useToast();
  const { hunt } = useHuntFragment();

  const [updateOrder, result] = useMutation(UpdateClueOrderDocument, {
    // refetchQueries: [GetOrderedCluesDocument],
    onCompleted: () =>
      toast({
        variant: "success",
        message: "Clue order updated successfully!",
      }),
    onError: () =>
      toast({
        variant: "error",
        message: "Unable to update the order of clues at this time.",
      }),
  });

  const handleUpdateOrder = useCallback(
    async (newOrder: (ClueFragment | null)[]) => {
      await updateOrder({
        variables: {
          input: {
            hunt_id: hunt._id || "",
            newOrder: newOrder.filter((clu) => !!clu).map((clu) => clu._id),
          },
        },
        optimisticResponse: {
          updateClueOrder: newOrder,
        },
        update: (cache, { data }) => {
          if (!data) return;
          cache.writeQuery({
            query: GetOrderedCluesDocument,
            data: {
              clues: data.updateClueOrder,
            },
          });
        },
        updateQueries: {
          GetOrderedClues: (prev, { mutationResult }) => {
            if (!mutationResult.data) return prev;
            return {
              ...prev,
              clues: mutationResult.data.updateClueOrder,
            };
          },
        },
      });
    },
    [hunt._id, updateOrder]
  );

  return useMemo(
    (): [typeof handleUpdateOrder, typeof result] => [
      handleUpdateOrder,
      result,
    ],
    [handleUpdateOrder, result]
  );
};
