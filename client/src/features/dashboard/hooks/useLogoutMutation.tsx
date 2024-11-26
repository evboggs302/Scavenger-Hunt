import { useApolloClient, useMutation } from "@apollo/client";
import { LogoutUserDocument } from "@generated/graphql";
import { useCallback, useMemo } from "react";
import { useTokenContext } from "@lib/context/TokenContext";
import { useApolloContextHeaders } from "@/apolloClient/useApolloContextHeaders";
import { useNavigate } from "react-router-dom";

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const headers = useApolloContextHeaders();
  const client = useApolloClient();
  const [logoutUser, result] = useMutation(LogoutUserDocument, {
    context: headers,
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
  }, [logoutUser, client, navigate]);

  return useMemo(
    (): [typeof onLogout, typeof result] => [onLogout, result],
    [onLogout, result]
  );
};
