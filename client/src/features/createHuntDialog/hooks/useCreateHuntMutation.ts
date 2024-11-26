import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import {
  CreateHuntDocument,
  GetHuntsByUserIdDocument,
} from "@generated/graphql";
import { useNavigate } from "react-router-dom";
import { useApolloContextHeaders } from "@apolloClient/useApolloContextHeaders";
import { CreateHuntFormState } from "../components/CreateHuntDialog";
import dayjs from "dayjs";

export const useCreateHuntMutation = () => {
  const navigate = useNavigate();
  const headers = useApolloContextHeaders();
  const [createHunt, result] = useMutation(CreateHuntDocument, {
    context: headers,
  });

  const handleCreateHunt = useCallback(
    async (formData: CreateHuntFormState) => {
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
      });
    },
    [createHunt, navigate]
  );

  return useMemo(
    (): [typeof handleCreateHunt, typeof result] => [handleCreateHunt, result],
    [handleCreateHunt, result]
  );
};
