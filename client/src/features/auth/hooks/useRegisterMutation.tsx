import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router";
import { RegisterUserDocument } from "@generated/graphql";
import { useTokenContext } from "@lib/context/TokenContext";

type RegisterUserCallbackProps = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  const { setToken } = useTokenContext();
  const [registerUser, result] = useMutation(RegisterUserDocument);

  const handlRegisterUser = useCallback(
    async ({
      username,
      password,
      firstName,
      lastName,
    }: RegisterUserCallbackProps) => {
      await registerUser({
        variables: {
          input: {
            user_name: username,
            password,
            first_name: firstName,
            last_name: lastName,
          },
        },
        onCompleted: ({ registerUser }) => {
          localStorage.setItem("BEARER_TOKEN", registerUser.token);
          setToken(registerUser.token);
          navigate("/dashboard");
        },
      });
    },
    [registerUser, setToken, navigate]
  );

  return useMemo(
    (): [typeof handlRegisterUser, typeof result] => [
      handlRegisterUser,
      result,
    ],
    [handlRegisterUser, result]
  );
};
