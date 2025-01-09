import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { CreateSingleTeamDocument, GetHuntDocument } from "@generated/graphql";
import { useApolloContextHeaders } from "@apolloClient/useApolloContextHeaders";
import { useHuntFragment } from "@features/huntInfo/hooks/useHuntFragment";
import { CreateTeamsFormState } from "../components/CreateTeamsDialog/CreateTeamsDialog";

type RequiredFormState = CreateTeamsFormState & { isMulti: false };

export const useCreateSingleTeamMutation = () => {
  const headers = useApolloContextHeaders();
  const { hunt } = useHuntFragment();
  const [createSingleTeam, result] = useMutation(CreateSingleTeamDocument, {
    context: headers,
  });

  const handleCreateSingleTeam = useCallback(
    async ({ team }: RequiredFormState) => {
      await createSingleTeam({
        refetchQueries: [GetHuntDocument],
        variables: {
          input: {
            hunt_id: hunt._id || "",
            ...team,
          },
        },
      });
    },
    [createSingleTeam, hunt._id]
  );

  return useMemo(
    (): [typeof handleCreateSingleTeam, typeof result] => [
      handleCreateSingleTeam,
      result,
    ],
    [handleCreateSingleTeam, result]
  );
};
