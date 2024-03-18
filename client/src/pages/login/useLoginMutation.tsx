import { useApolloClient, useMutation } from "@apollo/client";
import { LoginUserDocument } from "../../generated/graphql";
// import { useNavigate } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { setContext } from "@apollo/client/link/context";
import { httpLink } from "../../../apolloClient";
import { useUserContext } from "../../shared/user/context/useUserContext";

export const useLoginMutation = () => {
  const [loginUser] = useMutation(LoginUserDocument);
  const client = useApolloClient();

  const handlLoginUser = useCallback(
    async ({ username, password }: { username: string; password: string }) => {
      const { data, errors } = await loginUser({
        variables: { input: { user_name: username, password } },
      });
      try {
        const token = data?.login.token;
        const authLink = setContext((_, { headers }) => {
          const { token } = useUserContext();
          return {
            headers: {
              ...headers,
              "Access-Control-Allow-Origin": `${process.env.CLIENT_URL}`,
              authorization: `Bearer ${token || ""}`,
            },
          };
        });
        const newLink = authLink.concat(httpLink);
        client.setLink(newLink);

        return data;
      } catch (err) {
        console.log("useLoginMutation");
        console.log(errors);
      }
    },
    []
  );

  return useMemo(
    () => ({
      loginUser: handlLoginUser, // mutation handler
    }),
    []
  );
};
