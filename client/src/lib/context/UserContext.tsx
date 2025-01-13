import React, { createContext, PropsWithChildren, useContext } from "react";
import {
  GetUserFromTokenDocument,
  GetUserFromTokenQuery,
  GetUserFromTokenQueryVariables,
} from "@generated/graphql";
<<<<<<< HEAD
import { useApolloContextHeaders } from "@apolloClient/useApolloContextHeaders";
import { QueryResult, useQuery } from "@apollo/client";
import { useTokenContext } from "./TokenContext";
=======
import { QueryResult, useQuery } from "@apollo/client";
>>>>>>> subscriptions-and-things
import { useNavigate } from "react-router";

export type UserContextValue = QueryResult<
  GetUserFromTokenQuery,
  GetUserFromTokenQueryVariables
>;

export const UserContext = createContext<UserContextValue | undefined>(
  undefined
);

export const UserQryContextProvider = ({ children }: PropsWithChildren) => {
<<<<<<< HEAD
  const { token } = useTokenContext();
  const navigate = useNavigate();

  const result = useQuery(GetUserFromTokenDocument, {
    variables: { tkn: token || "invalid" },
    context: useApolloContextHeaders(),
    pollInterval: 4500,
    onError: () => navigate("/login", { replace: true }),
=======
  const navigate = useNavigate();

  const result = useQuery(GetUserFromTokenDocument, {
    pollInterval: 10_000,
    onError: () => {
      localStorage.removeItem("BEARER_TOKEN");
      return navigate("/login", { replace: true });
    },
>>>>>>> subscriptions-and-things
  });

  return <UserContext.Provider value={result}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useUserContext must be used within a UserQryContextProvider"
    );
  }

  return context;
};
