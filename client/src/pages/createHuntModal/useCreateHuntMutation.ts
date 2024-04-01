import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { CreateHuntDocument } from "../../generated/graphql";
import { apolloContextHeaders } from "../../../apolloClient/apolloContextHeaders";

type CreateHuntCallbackProps = {
  name: string;
  startDate: string;
  endDate: string;
};

export const useCreateHuntMutation = () => {
  const navigate = useNavigate();
  const headers = apolloContextHeaders();
  const [registerUser, result] = useMutation(CreateHuntDocument, {
    context: headers,
  });

  const handlRegisterUser = useCallback(
    async ({ name, startDate, endDate }: CreateHuntCallbackProps) => {
      await registerUser({
        variables: {
          name,
          start_date: startDate,
          end_date: endDate,
        },
        // onCompleted: ({ createHunt }) => {
        //   navigate("/dashboard");
        // },
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
