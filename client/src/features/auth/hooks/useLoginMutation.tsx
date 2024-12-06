import { useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import {
  LoginUserDocument,
  LoginUserMutationVariables,
} from "@generated/graphql";
import { useNavigate } from "react-router";
import { useTokenContext } from "@lib/context/TokenContext";

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const { setToken } = useTokenContext();
  const [loginUser, result] = useMutation(LoginUserDocument);

  const handleLoginUser = useCallback(
    async (args: LoginUserMutationVariables) => {
      await loginUser({
        variables: args,
        onCompleted: ({ login }) => {
          localStorage.setItem("BEARER_TOKEN", login.token);
          setToken(login.token);
          navigate("/dashboard");
        },
      });
    },
    [loginUser, navigate]
  );

  return useMemo(
    (): [typeof handleLoginUser, typeof result] => [handleLoginUser, result],
    [handleLoginUser, result]
  );
};
