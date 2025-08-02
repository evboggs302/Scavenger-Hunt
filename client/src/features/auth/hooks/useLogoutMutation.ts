import { useApolloClient, useMutation } from "@apollo/client";
import { LogoutUserDocument } from "@generated/graphql";
import { useCallback, useMemo } from "react";
import { useTokenContext } from "@lib/context/TokenContext";
import { useNavigate } from "react-router";

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const client = useApolloClient();
  const { setToken } = useTokenContext();
  const [logoutUser, result] = useMutation(LogoutUserDocument, {
    fetchPolicy: "network-only",
    onCompleted: () => {
      localStorage.clear();
      client.clearStore();
      setToken(null);
      return navigate("/");
    },
  });

  const onLogout = useCallback(async () => {
    await logoutUser();
  }, [logoutUser]);

  return useMemo(
    (): [typeof onLogout, typeof result] => [onLogout, result],
    [onLogout, result]
  );
};
