import React from "react";
import { useQuery } from "@apollo/client";
import { apolloContextHeaders } from "../../../../apolloClient/apolloContextHeaders";
import { useHuntContext } from "../huntContext/useHuntContext";
import { ClueContext } from "./ClueContext";
import { GetOrderedCluesDocument } from "../../../generated/graphql";

interface ClueQryContextProviderProps {
  children: React.ReactNode;
}

export const ClueQryContextProvider = ({
  children,
}: ClueQryContextProviderProps) => {
  const { _id } = useHuntContext();
  const headers = apolloContextHeaders();

  const { data, error, loading } = useQuery(GetOrderedCluesDocument, {
    context: headers,
    fetchPolicy: "cache-and-network",
    variables: { id: _id || "" },
  });

  return (
    <ClueContext.Provider
      value={{ clues: data?.getCluesByHuntId, error, loading }}>
      {children}
    </ClueContext.Provider>
  );
};
