import { useApolloClient, useMutation } from "@apollo/client";
import { LogoutUserDocument } from "@generated/graphql";
import { useCallback, useMemo } from "react";
import { useTokenContext } from "@lib/context/TokenContext";
import { useNavigate } from "react-router";

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const client = useApolloClient();
  const [logoutUser, result] = useMutation(LogoutUserDocument, {
    fetchPolicy: "network-only",
  });
  const { setToken } = useTokenContext();

  const onLogout = useCallback(async () => {
    await logoutUser({
      onCompleted: () => {
        localStorage.clear();
        client.clearStore();
        setToken(null);
        return navigate("/");
      },
    });
  }, [logoutUser, client, setToken, navigate]);

  return useMemo(
    (): [typeof onLogout, typeof result] => [onLogout, result],
    [onLogout, result]
  );
};
