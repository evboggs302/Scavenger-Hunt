import React, { createContext, PropsWithChildren, useContext } from "react";
import {
  GetHuntDocument,
  GetHuntQuery,
  GetHuntQueryVariables,
} from "@generated/graphql";
import { QueryResult, useQuery } from "@apollo/client";
import { Navigate, useParams } from "react-router";

export type HuntContextValue = QueryResult<GetHuntQuery, GetHuntQueryVariables>;

export const HuntContext = createContext<HuntContextValue | undefined>(
  undefined
);

export const HuntQryContextProvider = ({
  children,
}: PropsWithChildren<unknown>) => {
  const { huntId } = useParams();

  const result = useQuery(GetHuntDocument, {
    fetchPolicy: "cache-and-network",
    variables: { id: huntId || "" },
  });

  return <HuntContext.Provider value={result}>{children}</HuntContext.Provider>;
};

export const useHuntContext = () => {
  const context = useContext(HuntContext);

  if (!context) {
    throw new Error(
      "useHuntContext must be used within a HuntContext provider"
    );
  }

  return context;
};
