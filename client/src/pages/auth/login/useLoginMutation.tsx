import { useMutation } from "@apollo/client";
import {
  LoginUserDocument,
  LoginUserMutationVariables,
} from "@generated/graphql";
import { useCallback, useMemo } from "react";
import { useTokenContext } from "@lib/context/TokenContext";
import { useNavigate } from "react-router-dom";

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const { setToken } = useTokenContext();
  const [loginUser, result] = useMutation(LoginUserDocument);

  const handlLoginUser = useCallback(
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
    (): [typeof handlLoginUser, typeof result] => [handlLoginUser, result],
    [handlLoginUser, result]
  );
};
