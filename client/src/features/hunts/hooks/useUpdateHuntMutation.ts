import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { GetHuntDocument, UpdateHuntDocument } from "@generated/graphql";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
import { UpdateHuntFormState } from "../components/UpdateHuntDialog/UpdateHuntDialog";

export const useUpdateHuntMutation = () => {
  const { hunt } = useHuntFragment();
  const [updateHunt, result] = useMutation(UpdateHuntDocument, {
    refetchQueries: [GetHuntDocument],
  });

  const handleUpdateHunt = useCallback(
    async (formData: UpdateHuntFormState) => {
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
