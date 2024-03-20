import { useMutation } from "@apollo/client";
import {
  LoginUserDocument,
  RegisterUserDocument,
} from "../../../generated/graphql";
import { useCallback, useMemo } from "react";
import { useTokenContext } from "../../../shared/context/tokenManagement/useTokenRefContext";

type RegisterUserCallbackProps = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const useRegisterMutation = () => {
  const [registerUser] = useMutation(RegisterUserDocument);
  const { setToken } = useTokenContext();

  const handlRegisterUser = useCallback(
    async ({
      username,
      password,
      firstName,
      lastName,
    }: RegisterUserCallbackProps) => {
      const { data, errors } = await registerUser({
        variables: {
          input: {
            user_name: username,
            password,
            first_name: firstName,
            last_name: lastName,
          },
        },
      });
      if (data?.registerUser?.token) {
        localStorage.setItem("BEARER_TOKEN", data.registerUser.token);
        setToken(data.registerUser.token);
        return data;
      } else {
        console.log("useRegisterMutation");
        console.log(errors);
      }
    },
    []
  );

  return useMemo(
    () => ({
      registerUser: handlRegisterUser,
    }),
    []
  );
};
