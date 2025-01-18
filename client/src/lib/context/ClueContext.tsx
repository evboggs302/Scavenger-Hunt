import { createContext, PropsWithChildren, useContext } from "react";
import { QueryResult, useQuery } from "@apollo/client";
import {
  GetOrderedCluesDocument,
  GetOrderedCluesQuery,
  GetOrderedCluesQueryVariables,
} from "@generated/graphql";
import { useHuntFragment } from "../hooks/useHuntFragment";

type ClueContextValue = QueryResult<
  GetOrderedCluesQuery,
  GetOrderedCluesQueryVariables
>;

const ClueContext = createContext<ClueContextValue | undefined>(undefined);

export const ClueQryContextProvider = ({ children }: PropsWithChildren) => {
  const { hunt } = useHuntFragment();

  const result = useQuery(GetOrderedCluesDocument, {
    fetchPolicy: "cache-and-network",
    variables: { id: hunt._id || "" },
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
