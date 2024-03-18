import React, { createContext, useContext } from "react";
import {
  ApolloQueryResult,
  OperationVariables,
  useQuery,
} from "@apollo/client";
import { GetUserFromTokenDocument } from "../../generated/graphql";
import { useTokenContext } from "../tokenManagement/useTokenRefContext";

interface QueryContextValue<TData> {
  data?: TData;
  error?: any;
  loading: boolean;
  refetch: () => Promise<ApolloQueryResult<TData>>;
}

const QueryResultContext = createContext<QueryContextValue<any>>({
  loading: true,
  refetch: () => Promise.resolve({} as ApolloQueryResult<any>),
});

interface QueryResultProviderProps {
  children: React.ReactNode;
}

export const UserQueryResultProvider = ({ children }: QueryResultProviderProps) => {
  const { token } = useTokenContext();
  const { data, error, loading, refetch } = useQuery(GetUserFromTokenDocument, {
    variables: { tkn: token },
  });
  const value = { data, error, loading, refetch };
  return (
    <QueryResultContext.Provider value={value}>
      {children}
    </QueryResultContext.Provider>
  );
};

export const useUserQueryResult = () => {
  const context = useContext(QueryResultContext);
  if (!context) {
    throw new Error("useQueryResult must be used within a QueryResultProvider");
  }
  return context;
};
