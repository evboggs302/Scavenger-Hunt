import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router";
import { RegisterUserDocument } from "@generated/graphql";
import { useTokenContext } from "@lib/context/TokenContext";

type RegisterUserCallbackProps = {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  const { setToken } = useTokenContext();
  const [registerUser, result] = useMutation(RegisterUserDocument, {
    onCompleted: ({ registerUser }) => {
      localStorage.setItem("BEARER_TOKEN", registerUser.token);
      setToken(registerUser.token);
      navigate("/app/account");
    },
  });

  const handlRegisterUser = useCallback(
    async ({
      email,
      username,
      password,
      firstName,
      lastName,
    }: RegisterUserCallbackProps) => {
      await registerUser({
        variables: {
          input: {
            email,
            password,
            user_name: username,
            first_name: firstName,
            last_name: lastName,
          },
        },
      });
    },
    [registerUser]
  );

  return useMemo(
    (): [typeof handlRegisterUser, typeof result] => [
      handlRegisterUser,
      result,
    ],
    [handlRegisterUser, result]
  );
};
