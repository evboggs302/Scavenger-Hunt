import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { GetHuntDocument, UpdateHuntDocument } from "@generated/graphql";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
import type { UpdateHuntFormSchema } from "../components/UpdateHuntDialog/useUpdateHuntResolver";
import { useToast } from "@lib/hooks/useToast";

export const useUpdateHuntMutation = () => {
  const { hunt } = useHuntFragment();
  const [toast] = useToast();

  const [updateHunt, result] = useMutation(UpdateHuntDocument, {
    refetchQueries: [GetHuntDocument],
    onCompleted: () =>
      toast({
        variant: "success",
        message: "Hunt was updated successfully!",
      }),
    onError: () =>
      toast({
        variant: "error",
        message: "Unable to update this hunt at this time.",
      }),
  });

  const handleUpdateHunt = useCallback(
    async (formData: UpdateHuntFormSchema) => {
      await updateHunt({
        variables: {
          input: {
            hunt_id: hunt._id || "",
            name: formData.name,
            start_date: formData.startDate.utc().toISOString(),
            end_date: formData.multipleDays
              ? formData.endDate.utc().toISOString()
              : formData.startDate.utc().toISOString(),
            recall_message: formData.recallMessage,
          },
        },
      });
    },
    [updateHunt, hunt]
  );

  return useMemo(
    (): [typeof handleUpdateHunt, typeof result] => [handleUpdateHunt, result],
    [handleUpdateHunt, result]
  );
};
