import React, { createContext, useContext } from "react";
import {
  GetUserFromTokenDocument,
  GetUserFromTokenQuery,
  GetUserFromTokenQueryVariables,
} from "@generated/graphql";
import { useApolloContextHeaders } from "@apolloClient/useApolloContextHeaders";
import { QueryResult, useQuery } from "@apollo/client";
import { useTokenContext } from "./TokenContext";

export type UserContextValue = QueryResult<
  GetUserFromTokenQuery,
  GetUserFromTokenQueryVariables
>;

export const UserContext = createContext<UserContextValue | undefined>(
  undefined
);

interface UserQryContextProviderProps {
  children: React.ReactNode;
}

export const UserQryContextProvider = ({
  children,
}: UserQryContextProviderProps) => {
  const { token } = useTokenContext();
  const result = useQuery(GetUserFromTokenDocument, {
    variables: { tkn: token || "invalid" },
    context: useApolloContextHeaders(),
    pollInterval: 4500,
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
