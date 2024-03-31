import React from "react";
import { useQuery } from "@apollo/client";
import { apolloContextHeaders } from "../../../../../apolloClient/apolloContextHeaders";
import { UserContext } from "./UserContext";
import { useTokenContext } from "../../tokenContext/useTokenContext";
import { GetUserFromTokenDocument } from "../../../../generated/graphql";

interface UserQryContextProviderProps {
  children: React.ReactNode;
}

export const UserQryContextProvider = ({
  children,
}: UserQryContextProviderProps) => {
  const { token } = useTokenContext();
  const { data, error, loading } = useQuery(GetUserFromTokenDocument, {
    variables: { tkn: token || "invalid" },
    context: apolloContextHeaders(),
    pollInterval: 4500,
  });

  return (
    <UserContext.Provider value={{ ...data?.getUserFromToken, error, loading }}>
      {children}
    </UserContext.Provider>
  );
};
