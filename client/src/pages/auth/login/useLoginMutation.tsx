import { useMutation } from "@apollo/client";
import { LoginUserDocument } from "../../../generated/graphql";
import { useCallback, useMemo } from "react";
import { useTokenContext } from "../../../shared/context/tokenManagement/useTokenRefContext";

export const useLoginMutation = () => {
  const [loginUser, result] = useMutation(LoginUserDocument);

  const handlLoginUser = useCallback(
    async ({ username, password }: { username: string; password: string }) => {
      return loginUser({
        variables: { username, password },
      });
    },
    [loginUser]
  );

  return useMemo(
    (): [typeof handlLoginUser, typeof result] => [handlLoginUser, result],
    [handlLoginUser, result]
  );
};
