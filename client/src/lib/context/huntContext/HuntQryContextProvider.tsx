import React from "react";
import { useQuery } from "@apollo/client";
import { GetHuntDocument } from "@generated/graphql";
import { Navigate, useParams } from "react-router-dom";
import { HuntContext } from "./HuntContext";
import { apolloContextHeaders } from "@apolloClient/apolloContextHeaders";

interface HuntQryContextProviderProps {
  children: React.ReactNode;
}

export const HuntQryContextProvider = ({
  children,
}: HuntQryContextProviderProps) => {
  const { id } = useParams();
  const headers = apolloContextHeaders();

  const { data, error, loading } = useQuery(GetHuntDocument, {
    context: headers,
    fetchPolicy: "cache-and-network",
    variables: { id: id || "" },
  });

  return (
    <HuntContext.Provider value={{ ...data?.getHunt, error, loading }}>
      {children}
    </HuntContext.Provider>
  );
};
