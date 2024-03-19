import { useMutation } from "@apollo/client";
import { LoginUserDocument } from "../../generated/graphql";
import { useCallback, useMemo } from "react";
import { useTokenContext } from "../../shared/tokenManagement/useTokenRefContext";

export const useLoginMutation = () => {
  const [loginUser] = useMutation(LoginUserDocument);
  const { setToken } = useTokenContext();

  const handlLoginUser = useCallback(
    async ({ username, password }: { username: string; password: string }) => {
      const { data, errors } = await loginUser({
        variables: { username, password },
      });
      if (data?.login.token) {
        localStorage.setItem("BEARER_TOKEN", data.login.token);
        setToken(data.login.token);
        return data;
      } else {
        console.log("useLoginMutation");
        console.log(errors);
      }
    },
    []
  );

  return useMemo(
    () => ({
      loginUser: handlLoginUser,
    }),
    []
  );
};
