import React, {
  createContext,
  PropsWithChildren,
  ProviderProps,
  useContext,
} from "react";
import {
  GetHuntDocument,
  GetHuntQuery,
  GetHuntQueryVariables,
} from "@generated/graphql";
import { apolloContextHeaders } from "@/apolloClient/apolloContextHeaders";
import { QueryResult, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

export interface HuntContextValue
  extends QueryResult<GetHuntQuery, GetHuntQueryVariables> {}

export const HuntContext = createContext<HuntContextValue | undefined>(
  undefined
);

export const HuntQryContextProvider = ({
  children,
}: PropsWithChildren<unknown>) => {
  const { id } = useParams();
  const headers = apolloContextHeaders();

  const result = useQuery(GetHuntDocument, {
    context: headers,
    fetchPolicy: "cache-and-network",
    variables: { id: id || "" },
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
