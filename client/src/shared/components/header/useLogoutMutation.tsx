import { useApolloClient, useMutation } from "@apollo/client";
import { LogoutUserDocument } from "../../../generated/graphql";
import { useCallback, useMemo } from "react";
import { useTokenContext } from "../../context/tokenContext/useTokenContext";
import { apolloContextHeaders } from "../../../../apolloClient/apolloContextHeaders";
import { useNavigate } from "react-router-dom";

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const headers = apolloContextHeaders();
  const client = useApolloClient();
  const [logoutUser, result] = useMutation(LogoutUserDocument, {
    context: headers,
    fetchPolicy: "network-only",
  });
  const { setToken } = useTokenContext();

  const handlLogoutUser = useCallback(async () => {
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
    (): [typeof handlLogoutUser, typeof result] => [handlLogoutUser, result],
    [handlLogoutUser, result]
  );
};
