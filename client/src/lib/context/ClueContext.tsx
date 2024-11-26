import React, { createContext, useContext } from "react";
import { QueryResult, useQuery } from "@apollo/client";
import { useApolloContextHeaders } from "@apolloClient/useApolloContextHeaders";
import {
  GetOrderedCluesDocument,
  GetOrderedCluesQuery,
  GetOrderedCluesQueryVariables,
} from "@generated/graphql";
import { useHuntContext } from "./HuntContext";

type ClueContextValue = QueryResult<
  GetOrderedCluesQuery,
  GetOrderedCluesQueryVariables
>;

const ClueContext = createContext<ClueContextValue | undefined>(undefined);
interface ClueQryContextProviderProps {
  children: React.ReactNode;
}

export const ClueQryContextProvider = ({
  children,
}: ClueQryContextProviderProps) => {
  const { data } = useHuntContext();
  const headers = useApolloContextHeaders();

  const result = useQuery(GetOrderedCluesDocument, {
    context: headers,
    fetchPolicy: "cache-and-network",
    variables: { id: data?.hunt?._id || "" },
  });

  return <ClueContext.Provider value={result}>{children}</ClueContext.Provider>;
};

export const useClueContext = () => {
  const context = useContext(ClueContext);

  if (!context) {
    throw new Error(
      "useClueContext must be used within a ClueContext provider"
    );
  }

  return context;
};
