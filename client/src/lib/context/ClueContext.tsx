import React, { createContext, useContext } from "react";
import { QueryResult, useQuery } from "@apollo/client";
import { apolloContextHeaders } from "@apolloClient/apolloContextHeaders";
import {
  GetOrderedCluesDocument,
  GetOrderedCluesQuery,
  GetOrderedCluesQueryVariables,
} from "@generated/graphql";
import { useHuntContext } from "./HuntContext";

interface ClueContextValue
  extends QueryResult<GetOrderedCluesQuery, GetOrderedCluesQueryVariables> {}

const ClueContext = createContext<ClueContextValue | undefined>(undefined);
interface ClueQryContextProviderProps {
  children: React.ReactNode;
}

export const ClueQryContextProvider = ({
  children,
}: ClueQryContextProviderProps) => {
  const { data } = useHuntContext();
  const headers = apolloContextHeaders();

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
