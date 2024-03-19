import { useApolloClient, useMutation } from "@apollo/client";
import { LogoutUserDocument } from "../../generated/graphql";
import { useCallback, useMemo } from "react";
import { useTokenContext } from "../tokenManagement/useTokenRefContext";
import { apolloContextHeaders } from "../apolloContextHeaders";
import { useNavigate } from "react-router-dom";

export const useLogoutMutation = () => {
  const headers = apolloContextHeaders();
  const client = useApolloClient();
  const navigate = useNavigate();
  const [logoutUser, { loading }] = useMutation(LogoutUserDocument, {
    context: headers,
    fetchPolicy: "network-only",
  });
  const { setToken } = useTokenContext();

  const handlLogoutUser = useCallback(async () => {
    const { data, errors } = await logoutUser();
    if (data?.logout) {
      console.log(data);
      localStorage.clear();
      client.clearStore();
      setToken(null);
      return navigate("/");
    } else {
      console.log("useLogoutMutation");
      console.log(errors);
    }
  }, []);

  return useMemo(
    () => ({
      logoutUser: handlLogoutUser,
      loading,
    }),
    []
  );
};
