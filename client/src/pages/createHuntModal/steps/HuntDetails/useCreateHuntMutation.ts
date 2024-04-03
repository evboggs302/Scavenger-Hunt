import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import {
  CreateHuntDocument,
  GetHuntsByUserIdDocument,
} from "../../../../generated/graphql";
import { apolloContextHeaders } from "../../../../../apolloClient/apolloContextHeaders";

type CreateHuntCallbackProps = {
  name: string;
  dateRange: { start: string; end: string };
  recall_msg?: string;
};

export const useCreateHuntMutation = () => {
  const navigate = useNavigate();
  const headers = apolloContextHeaders();
  const [registerUser, result] = useMutation(CreateHuntDocument, {
    context: headers,
  });

  const handlRegisterUser = useCallback(
    async ({ name, dateRange, recall_msg }: CreateHuntCallbackProps) => {
      return await registerUser({
        variables: {
          name,
          start_date: dateRange.start,
          end_date: dateRange.end,
          recall_message: recall_msg,
        },
        refetchQueries: [GetHuntsByUserIdDocument],
      });
    },
    [registerUser, navigate]
  );

  return useMemo(
    (): [typeof handlRegisterUser, typeof result] => [
      handlRegisterUser,
      result,
    ],
    [handlRegisterUser, result]
  );
};
