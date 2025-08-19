import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import {
  CreateHuntDocument,
  GetHuntsByUserIdDocument,
} from "@generated/graphql";
import { useNavigate } from "react-router";
import type { CreateHuntFormSchema } from "../components/CreateHuntDialog/useCreateHuntResolver";
import { useToast } from "@lib/hooks/useToast";

export const useCreateHuntMutation = () => {
  const navigate = useNavigate();
  const [toast] = useToast();
  const [createHunt, result] = useMutation(CreateHuntDocument);

  const handleCreateHunt = useCallback(
    async (formData: CreateHuntFormSchema) => {
      await createHunt({
        variables: {
          name: formData.name,
          start_date: formData.startDate.utc().toISOString(),
          end_date: formData.multipleDays
            ? formData.endDate.utc().toISOString()
            : formData.startDate.utc().toISOString(),
          recall_message: formData.recallMessage,
        },
        refetchQueries: [GetHuntsByUserIdDocument],
        onCompleted: ({ hunt }) => {
          navigate(`hunt/${hunt?._id}`);
        },
        onError: () =>
          toast({
            variant: "error",
            message: "Unable to create create a hunt at the moment.",
          }),
      });
    },
    [createHunt, navigate, toast]
  );

  return useMemo(
    (): [typeof handleCreateHunt, typeof result] => [handleCreateHunt, result],
    [handleCreateHunt, result]
  );
};
